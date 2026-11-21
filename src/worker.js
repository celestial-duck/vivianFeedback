/**
 * Celestia Studio x Vivian Feedback Survey
 * Cloudflare Workers API + D1 SQLite Database + Static Assets
 */

const VALID_CONSENT = new Set(["ยินยอม", "ไม่ยินยอม"]);

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS survey_responses (
    id TEXT PRIMARY KEY,
    is_demo INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    consent TEXT NOT NULL CHECK (consent IN ('ยินยอม', 'ไม่ยินยอม')),
    age_exact INTEGER,
    age_range TEXT NOT NULL,
    age_display TEXT NOT NULL,
    gender TEXT NOT NULL,
    ai_used TEXT NOT NULL,
    vivian_impression TEXT NOT NULL DEFAULT '',
    app_preference TEXT NOT NULL,
    app_preference_reason TEXT NOT NULL DEFAULT '',
    model_preference TEXT NOT NULL,
    model_preference_note TEXT NOT NULL DEFAULT '',
    naturalness TEXT NOT NULL,
    desired_features TEXT NOT NULL,
    desired_features_other TEXT NOT NULL DEFAULT '',
    project_rating INTEGER NOT NULL CHECK (project_rating BETWEEN 1 AND 5),
    satisfaction_rating INTEGER NOT NULL CHECK (satisfaction_rating BETWEEN 1 AND 4),
    issues_text TEXT NOT NULL DEFAULT '',
    suggestions_text TEXT NOT NULL DEFAULT ''
  )`,
  `CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_responses(created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_survey_consent ON survey_responses(consent)`,
];

let schemaInitialized = false;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function resolveD1(env) {
  if (!env || typeof env !== "object") return { db: null, bindingName: null };
  if (env.DB && typeof env.DB.prepare === "function") {
    return { db: env.DB, bindingName: "DB" };
  }
  for (const [key, value] of Object.entries(env)) {
    if (value && typeof value.prepare === "function" && typeof value.batch === "function") {
      return { db: value, bindingName: key };
    }
  }
  return { db: null, bindingName: null };
}

async function ensureSchema(db) {
  if (schemaInitialized) return;
  for (const sql of SCHEMA_STATEMENTS) {
    await db.prepare(sql).run();
  }
  schemaInitialized = true;
}

function safeJsonParseArray(raw) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function rowToEntry(row) {
  return {
    id: row.id,
    isDemo: Boolean(row.is_demo),
    createdAt: row.created_at,
    consent: row.consent,
    ageExact: row.age_exact === null || row.age_exact === undefined ? null : Number(row.age_exact),
    ageRange: row.age_range,
    ageDisplay: row.age_display,
    gender: row.gender,
    aiUsed: safeJsonParseArray(row.ai_used),
    vivianImpression: row.vivian_impression || "",
    appPreference: row.app_preference,
    appPreferenceReason: row.app_preference_reason || "",
    modelPreference: row.model_preference,
    modelPreferenceNote: row.model_preference_note || "",
    naturalness: row.naturalness,
    desiredFeatures: safeJsonParseArray(row.desired_features),
    desiredFeaturesOther: row.desired_features_other || "",
    projectRating: Number(row.project_rating),
    satisfactionRating: Number(row.satisfaction_rating),
    issuesText: row.issues_text || "",
    suggestionsText: row.suggestions_text || "",
  };
}

function computeStats(values) {
  const nums = values.filter((v) => typeof v === "number" && Number.isFinite(v));
  const n = nums.length;
  if (n === 0) {
    return { n: 0, mean: null, sampleSD: null, popSD: null };
  }
  const mean = nums.reduce((acc, v) => acc + v, 0) / n;
  const sqDiffSum = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  return {
    n,
    mean,
    sampleSD: n >= 2 ? Math.sqrt(sqDiffSum / (n - 1)) : null,
    popSD: Math.sqrt(sqDiffSum / n),
  };
}

function validateSubmission(body) {
  if (!body || typeof body !== "object") {
    return "Invalid JSON payload";
  }
  if (!VALID_CONSENT.has(body.consent)) {
    return "กรุณาระบุความยินยอม (ยินยอม หรือ ไม่ยินยอม)";
  }
  if (body.ageExact !== null && body.ageExact !== undefined && body.ageExact !== "") {
    const age = Number(body.ageExact);
    if (!Number.isInteger(age) || age < 5 || age > 110) {
      return "อายุต้องเป็นจำนวนเต็มระหว่าง 5 ถึง 110 ปี";
    }
  }
  if (!body.gender || typeof body.gender !== "string") {
    return "กรุณาระบุเพศ";
  }
  if (!Array.isArray(body.aiUsed) || body.aiUsed.length === 0) {
    return "กรุณาระบุประสบการณ์ AI Chatbot / Companion อย่างน้อย 1 รายการ";
  }
  if (!body.appPreference || typeof body.appPreference !== "string") {
    return "กรุณาเลือกรูปแบบแอปที่ชอบ";
  }
  if (!body.modelPreference || typeof body.modelPreference !== "string") {
    return "กรุณาเลือกรูปแบบโมเดล";
  }
  if (!body.naturalness || typeof body.naturalness !== "string") {
    return "กรุณาประเมินความเป็นธรรมชาติ";
  }
  const proj = Number(body.projectRating);
  if (!Number.isInteger(proj) || proj < 1 || proj > 5) {
    return "คะแนนโปรเจกต์ต้องเป็นจำนวนเต็ม 1 ถึง 5";
  }
  const sat = Number(body.satisfactionRating);
  if (!Number.isInteger(sat) || sat < 1 || sat > 4) {
    return "ความพึงพอใจต้องเป็นจำนวนเต็ม 1 ถึง 4";
  }
  return null;
}

async function insertEntry(db, entry) {
  await db
    .prepare(
      `INSERT INTO survey_responses (
        id, is_demo, created_at, consent, age_exact, age_range, age_display,
        gender, ai_used, vivian_impression, app_preference, app_preference_reason,
        model_preference, model_preference_note, naturalness, desired_features,
        desired_features_other, project_rating, satisfaction_rating,
        issues_text, suggestions_text
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      entry.id,
      entry.isDemo ? 1 : 0,
      entry.createdAt,
      entry.consent,
      entry.ageExact,
      entry.ageRange,
      entry.ageDisplay,
      entry.gender,
      JSON.stringify(entry.aiUsed),
      entry.vivianImpression,
      entry.appPreference,
      entry.appPreferenceReason,
      entry.modelPreference,
      entry.modelPreferenceNote,
      entry.naturalness,
      JSON.stringify(entry.desiredFeatures),
      entry.desiredFeaturesOther,
      entry.projectRating,
      entry.satisfactionRating,
      entry.issuesText,
      entry.suggestionsText
    )
    .run();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
      return new Response("Not Found", { status: 404 });
    }

    const { db, bindingName } = resolveD1(env);
    if (!db) {
      return jsonResponse(
        {
          error: "ไม่พบการเชื่อมต่อฐานข้อมูล Cloudflare D1 (กรุณาผูก D1 binding ชื่อ DB ใน Workers Settings)",
          code: "DB_NOT_BOUND",
          availableBindings: env ? Object.keys(env) : [],
        },
        503
      );
    }

    try {
      await ensureSchema(db);

      // GET /api/health
      if (url.pathname === "/api/health" && request.method === "GET") {
        await db.prepare("SELECT 1").first();
        return jsonResponse({ ok: true, database: "cloudflare-d1", bindingName });
      }

      // GET /api/responses
      if (url.pathname === "/api/responses" && request.method === "GET") {
        const { results } = await db
          .prepare("SELECT * FROM survey_responses ORDER BY created_at DESC")
          .all();
        const responses = (results || []).map(rowToEntry);
        return jsonResponse({
          responses,
          bindingName,
          summary: {
            total: responses.length,
            projectRatingStats: computeStats(responses.map((r) => r.projectRating)),
            satisfactionRatingStats: computeStats(responses.map((r) => r.satisfactionRating)),
            ageStats: computeStats(responses.map((r) => r.ageExact)),
          },
        });
      }

      // POST /api/responses
      if (url.pathname === "/api/responses" && request.method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON body" }, 400);
        }

        const err = validateSubmission(body);
        if (err) {
          return jsonResponse({ error: err }, 400);
        }

        const entry = {
          id:
            typeof body.id === "string" && body.id.trim()
              ? body.id.trim().slice(0, 64)
              : `resp-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
          isDemo: Boolean(body.isDemo),
          createdAt:
            typeof body.createdAt === "string" && body.createdAt.trim()
              ? body.createdAt.trim()
              : new Date().toISOString(),
          consent: body.consent,
          ageExact:
            body.ageExact === null || body.ageExact === undefined || body.ageExact === ""
              ? null
              : Number(body.ageExact),
          ageRange: String(body.ageRange || "ไม่ระบุ").slice(0, 60),
          ageDisplay: String(body.ageDisplay || "ไม่ระบุ").slice(0, 80),
          gender: String(body.gender).trim().slice(0, 80),
          aiUsed: body.aiUsed.map((v) => String(v).trim()).filter(Boolean).slice(0, 20),
          vivianImpression: String(body.vivianImpression || "").trim().slice(0, 2000),
          appPreference: String(body.appPreference).trim().slice(0, 120),
          appPreferenceReason: String(body.appPreferenceReason || "").trim().slice(0, 1000),
          modelPreference: String(body.modelPreference).trim().slice(0, 120),
          modelPreferenceNote: String(body.modelPreferenceNote || "").trim().slice(0, 1000),
          naturalness: String(body.naturalness).trim().slice(0, 160),
          desiredFeatures: Array.isArray(body.desiredFeatures)
            ? body.desiredFeatures.map((v) => String(v).trim()).filter(Boolean).slice(0, 20)
            : [],
          desiredFeaturesOther: String(body.desiredFeaturesOther || "").trim().slice(0, 500),
          projectRating: Number(body.projectRating),
          satisfactionRating: Number(body.satisfactionRating),
          issuesText: String(body.issuesText || "").trim().slice(0, 2000),
          suggestionsText: String(body.suggestionsText || "").trim().slice(0, 2000),
        };

        await insertEntry(db, entry);
        return jsonResponse({ ok: true, entry }, 201);
      }

      // POST /api/responses/demo
      if (url.pathname === "/api/responses/demo" && request.method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch {
          return jsonResponse({ error: "Invalid JSON body" }, 400);
        }
        const items = Array.isArray(body?.items) ? body.items : [];
        for (const item of items) {
          const err = validateSubmission(item);
          if (err) continue;
          const existing = await db
            .prepare("SELECT id FROM survey_responses WHERE id = ?")
            .bind(String(item.id))
            .first();
          if (!existing) {
            await insertEntry(db, { ...item, isDemo: true });
          }
        }
        return jsonResponse({ ok: true });
      }

      // DELETE /api/responses
      if (url.pathname === "/api/responses" && request.method === "DELETE") {
        await db.prepare("DELETE FROM survey_responses").run();
        return jsonResponse({ ok: true });
      }

      return jsonResponse({ error: "API endpoint not found" }, 404);
    } catch (error) {
      schemaInitialized = false;
      return jsonResponse(
        {
          error: error?.message || "Internal server error",
        },
        500
      );
    }
  },
};
