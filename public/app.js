(function () {
  "use strict";

  const PROJECT_LABELS = {
    1: "ไม่ชอบ",
    2: "เฉย ๆ",
    3: "ชอบ",
    4: "ฉันต้องการมาก",
    5: "อยากร่วมรันโปรเจกต์ด้วยเลย",
  };

  const SATISFACTION_LABELS = {
    1: "ไปทำใหม่ไป",
    2: "พึงพอใจนิดหน่อย",
    3: "ปานกลาง",
    4: "พึงพอใจ",
  };

  const SAMPLE_RESPONSES = [
    {
      id: "demo-1",
      isDemo: true,
      createdAt: "2026-11-20T10:15:00+07:00",
      consent: "ยินยอม",
      ageExact: 21,
      ageDisplay: "21 ปี (18-24 ปี)",
      ageRange: "18-24 ปี",
      gender: "หญิง",
      aiUsed: ["ChatGPT", "Character.AI", "Vivian (Celestia Studio)"],
      vivianImpression: "น้อง Vivian น่ารักมากค่ะ ชอบโทนเสียงที่คุยแล้วรู้สึกอบอุ่นเหมือนมีเพื่อนคอยรับฟัง",
      appPreference: "ชอบทั้งสองแบบ",
      appPreferenceReason: "อยู่บ้านชอบเปิดเว็บแอปจอใหญ่ แต่ข้างนอกอยากได้แอปมือถือ",
      modelPreference: "Live2D Model",
      modelPreferenceNote: "ชอบลายเส้นอนิเมะ 2D ขยับลื่น ๆ และไม่กินแบตมือถือ",
      naturalness: "เป็นธรรมชาติมาก เหมือนคุยกับคนจริง",
      desiredFeatures: [
        "ความจำระยะยาว (จำเรื่องที่เคยคุยได้)",
        "สีหน้าและท่าทางตอบสนองตามอารมณ์",
      ],
      desiredFeaturesOther: "",
      projectRating: 5,
      satisfactionRating: 4,
      issuesText: "ยังไม่มีปัญหาใหญ่ แต่อยากให้เพิ่มสติกเกอร์อารมณ์ตอนแชทอีกนิดค่ะ",
      suggestionsText: "อยากให้มีโหมดเปลี่ยนชุดน้อง Vivian ตามเทศกาลด้วยค่ะ สู้ ๆ นะคะ Celestia Studio!",
    },
    {
      id: "demo-2",
      isDemo: true,
      createdAt: "2026-11-20T14:22:00+07:00",
      consent: "ยินยอม",
      ageExact: 26,
      ageDisplay: "26 ปี (25-34 ปี)",
      ageRange: "25-34 ปี",
      gender: "ชาย",
      aiUsed: ["ChatGPT", "Gemini", "Claude"],
      vivianImpression: "UI สบายตาดีครับ ตอบภาษาไทยค่อนข้างเป็นกันเองกว่าหลายเจ้าที่เคยลอง",
      appPreference: "Web App (เว็บแอป)",
      appPreferenceReason: "เปิดทำงานควบคู่บนคอมพิวเตอร์ได้ทันที ไม่ต้องลงโปรแกรมเพิ่ม",
      modelPreference: "สลับได้ตามสเปค (Hybrid)",
      modelPreferenceNote: "บนคอมอยากลอง 3D แต่บนมือถืออยากสลับเป็น Live2D ได้",
      naturalness: "ค่อนข้างเป็นธรรมชาติ",
      desiredFeatures: [
        "ความจำระยะยาว (จำเรื่องที่เคยคุยได้)",
        "ภาษาไทยเป็นกันเอง มีอารมณ์ขัน",
      ],
      desiredFeaturesOther: "",
      projectRating: 4,
      satisfactionRating: 4,
      issuesText: "บางครั้งคำตอบยาว ๆ โหลดช้าเล็กน้อยช่วงเน็ตมือถือไม่เสถียร",
      suggestionsText: "ถ้าเชื่อมปฏิทินช่วยเตือนนัดสำคัญด้วยจะสุดยอดมากครับ",
    },
    {
      id: "demo-3",
      isDemo: true,
      createdAt: "2026-11-20T18:05:00+07:00",
      consent: "ยินยอม",
      ageExact: 19,
      ageDisplay: "19 ปี (18-24 ปี)",
      ageRange: "18-24 ปี",
      gender: "อื่น ๆ (Non-binary)",
      aiUsed: ["Character.AI", "Replika", "Vivian (Celestia Studio)"],
      vivianImpression: "ดีไซน์คาแรกเตอร์โดดเด่นมาก อยากคุยด้วยทุกวันเลย",
      appPreference: "Native App (แอปติดตั้ง)",
      appPreferenceReason: "อยากได้แจ้งเตือนเวลา Vivian ทักมาตอนเช้าหรือก่อนนอน",
      modelPreference: "Full 3D Model",
      modelPreferenceNote: "ชอบ 3D แบบหมุนมุมกล้องดูท่าทางได้เต็มตัว",
      naturalness: "ค่อนข้างเป็นธรรมชาติ",
      desiredFeatures: [
        "เสียงพูด (Voice Chat) ที่เป็นธรรมชาติ",
        "ทักทาย/คอยดูแลในชีวิตประจำวัน",
        "ปรับแต่งชุด ธีมห้อง และบุคลิกได้",
      ],
      desiredFeaturesOther: "",
      projectRating: 5,
      satisfactionRating: 3,
      issuesText: "บนหน้าจอมือถือเล็ก ๆ ปุ่มตั้งค่าบางจุดชิดกันไปนิดหน่อย",
      suggestionsText: "อยากให้มีห้องนอนหรือฉากหลังพาสเทลให้น้อง Vivian เดินเล่นได้ค่ะ",
    },
    {
      id: "demo-4",
      isDemo: true,
      createdAt: "2026-11-21T09:30:00+07:00",
      consent: "ยินยอม",
      ageExact: 24,
      ageDisplay: "24 ปี (18-24 ปี)",
      ageRange: "18-24 ปี",
      gender: "หญิง",
      aiUsed: ["ChatGPT", "Gemini"],
      vivianImpression: "น่ารักดีค่ะ แต่ยังอยากให้จำชื่อเล่นและเรื่องที่เล่าเมื่อวานได้แม่นขึ้น",
      appPreference: "Native App (แอปติดตั้ง)",
      appPreferenceReason: "เปิดจากหน้าจอมือถือสะดวกกว่าเข้าเว็บ",
      modelPreference: "Live2D Model",
      modelPreferenceNote: "",
      naturalness: "ปานกลาง ยังดูเป็น AI อยู่บ้าง",
      desiredFeatures: [
        "ความจำระยะยาว (จำเรื่องที่เคยคุยได้)",
        "ภาษาไทยเป็นกันเอง มีอารมณ์ขัน",
      ],
      desiredFeaturesOther: "",
      projectRating: 3,
      satisfactionRating: 3,
      issuesText: "บางทีตอบทวนคำถามเดิมซ้ำนิดหน่อย",
      suggestionsText: "เพิ่มคลังคำพูดภาษาไทยแบบวัยรุ่นน่ารัก ๆ จะทำให้ดูมีชีวิตชีวาขึ้นมากเลย",
    },
    {
      id: "demo-5",
      isDemo: true,
      createdAt: "2026-11-21T11:10:00+07:00",
      consent: "ไม่ยินยอม",
      ageExact: null,
      ageDisplay: "ไม่ระบุ",
      ageRange: "ไม่ระบุ",
      gender: "ไม่ระบุ",
      aiUsed: ["ไม่เคยใช้งานมาก่อน"],
      vivianImpression: "เพิ่งเคยลองแนว AI Companion ครั้งแรก น่ารักดีแต่ยังเขิน ๆ เวลาคุย",
      appPreference: "Web App (เว็บแอป)",
      appPreferenceReason: "ลองเล่นผ่านเว็บดูก่อนง่ายดี",
      modelPreference: "Live2D Model",
      modelPreferenceNote: "",
      naturalness: "ค่อนข้างเป็นธรรมชาติ",
      desiredFeatures: ["สีหน้าและท่าทางตอบสนองตามอารมณ์"],
      desiredFeaturesOther: "",
      projectRating: 4,
      satisfactionRating: 3,
      issuesText: "",
      suggestionsText: "อยากให้มีคู่มือแนะนำคำสั่งเริ่มต้นสำหรับมือใหม่ค่ะ",
    },
  ];

  // ---------- DOM References ----------
  const tabBtnForm = document.getElementById("tabBtnForm");
  const tabBtnStats = document.getElementById("tabBtnStats");
  const tabGlider = document.getElementById("tabGlider");
  const viewForm = document.getElementById("viewForm");
  const viewStats = document.getElementById("viewStats");
  const progressTrack = document.getElementById("progressTrack");
  const progressFill = document.getElementById("progressFill");
  const progressLabel = document.getElementById("progressLabel");
  const navResponseCount = document.getElementById("navResponseCount");

  const surveyForm = document.getElementById("surveyForm");

  const ageWriteIn = document.getElementById("ageWriteIn");
  const ageUnspecified = document.getElementById("ageUnspecified");
  const ageRangeGroup = document.getElementById("ageRangeGroup");
  const genderOtherWrap = document.getElementById("genderOtherWrap");
  const genderOtherText = document.getElementById("genderOtherText");
  const consentNotice = document.getElementById("consentNotice");
  const aiNoneCheck = document.getElementById("aiNoneCheck");
  const aiOtherWriteIn = document.getElementById("aiOtherWriteIn");

  const projectRatingInput = document.getElementById("projectRatingInput");
  const projectRatingBadge = document.getElementById("projectRatingBadge");
  const satisfactionInput = document.getElementById("satisfactionInput");
  const satisfactionBadge = document.getElementById("satisfactionBadge");

  const successModal = document.getElementById("successModal");
  const modalSummary = document.getElementById("modalSummary");
  const btnCloseModal = document.getElementById("btnCloseModal");
  const btnGoToStats = document.getElementById("btnGoToStats");
  const btnResetForm = document.getElementById("btnResetForm");

  // Stats & DB DOM
  const filterConsentOnly = document.getElementById("filterConsentOnly");
  const dbStatusBadge = document.getElementById("dbStatusBadge");
  const formDbError = document.getElementById("formDbError");
  const statsDbError = document.getElementById("statsDbError");
  const demoNotice = document.getElementById("demoNotice");
  const btnLoadDemo = document.getElementById("btnLoadDemo");
  const btnExportCsv = document.getElementById("btnExportCsv");
  const btnExportJson = document.getElementById("btnExportJson");
  const btnClearAllData = document.getElementById("btnClearAllData");
  const btnSubmitForm = document.getElementById("btnSubmitForm");

  // ---------- Cloudflare D1 API Client (No browser cache / localStorage) ----------
  let dbConnected = false;
  let lastDbError = "";
  let responses = [];

  function setDbBanner(message) {
    lastDbError = message || "";
    if (formDbError) {
      formDbError.hidden = !lastDbError;
      formDbError.textContent = lastDbError;
    }
    if (statsDbError) {
      statsDbError.hidden = !lastDbError;
      statsDbError.textContent = lastDbError;
    }
  }

  function updateDbBadge() {
    if (!dbStatusBadge) return;
    dbStatusBadge.classList.remove("is-d1", "is-error");
    if (dbConnected) {
      dbStatusBadge.textContent = "Cloudflare D1 (ออนไลน์)";
      dbStatusBadge.classList.add("is-d1");
    } else if (lastDbError) {
      dbStatusBadge.textContent = "D1 ยังไม่พร้อมเชื่อมต่อ";
      dbStatusBadge.classList.add("is-error");
    } else {
      dbStatusBadge.textContent = "กำลังเชื่อมต่อ D1...";
    }
  }

  async function fetchResponsesFromD1() {
    if (window.location.protocol === "file:") {
      dbConnected = false;
      setDbBanner("ไม่สามารถเชื่อมต่อ Cloudflare D1 ผ่าน file:// ได้ กรุณาเปิดผ่าน URL ของ Cloudflare Workers หรือ npx wrangler dev");
      updateDbBadge();
      return [];
    }
    try {
      const res = await fetch("/api/responses", { cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `เชื่อมต่อ D1 ไม่สำเร็จ (HTTP ${res.status})`);
      }
      if (!Array.isArray(data.responses)) {
        throw new Error("รูปแบบข้อมูลจาก /api/responses ไม่ถูกต้อง");
      }
      dbConnected = true;
      setDbBanner("");
      updateDbBadge();
      return data.responses;
    } catch (err) {
      dbConnected = false;
      setDbBanner(`ไม่สามารถโหลดข้อมูลจาก Cloudflare D1: ${err.message}`);
      updateDbBadge();
      return [];
    }
  }

  // ---------- Tab Navigation & Sliding Glider ----------
  function updateGlider(activeBtn) {
    if (!tabGlider || !activeBtn) return;
    const parentRect = activeBtn.parentElement.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const offsetLeft = btnRect.left - parentRect.left - 4;
    tabGlider.style.width = `${btnRect.width}px`;
    tabGlider.style.transform = `translateX(${offsetLeft}px)`;
  }

  function switchTab(tabName) {
    const isForm = tabName === "form";
    tabBtnForm.classList.toggle("is-active", isForm);
    tabBtnStats.classList.toggle("is-active", !isForm);
    tabBtnForm.setAttribute("aria-selected", String(isForm));
    tabBtnStats.setAttribute("aria-selected", String(!isForm));

    viewForm.hidden = !isForm;
    viewStats.hidden = isForm;
    viewForm.classList.toggle("is-active", isForm);
    viewStats.classList.toggle("is-active", !isForm);
    progressTrack.classList.toggle("is-hidden", !isForm);

    updateGlider(isForm ? tabBtnForm : tabBtnStats);
    if (!isForm) {
      renderStats();
      fetchResponsesFromD1().then((fresh) => {
        responses = fresh;
        updateNavBadge();
        renderStats();
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabBtnForm.addEventListener("click", () => switchTab("form"));
  tabBtnStats.addEventListener("click", () => switchTab("stats"));
  window.addEventListener("resize", () => {
    const active = document.querySelector(".mode-tab.is-active");
    updateGlider(active);
  });

  // ---------- Scroll Reveal Observer ----------
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal-on-scroll");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    items.forEach((el) => observer.observe(el));
  }

  // ---------- Consent & Demographics Logic ----------
  surveyForm.querySelectorAll('input[name="consent"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      clearError("err-consent", radio);
      const isNo = radio.value === "ไม่ยินยอม" && radio.checked;
      consentNotice.hidden = !isNo;
      updateProgress();
    });
  });

  function mapAgeToRange(num) {
    if (num < 18) return "ต่ำกว่า 18 ปี";
    if (num <= 24) return "18-24 ปี";
    if (num <= 34) return "25-34 ปี";
    if (num <= 44) return "35-44 ปี";
    return "45 ปีขึ้นไป";
  }

  ageWriteIn.addEventListener("input", () => {
    const val = ageWriteIn.value.trim();
    if (val !== "") {
      ageUnspecified.checked = false;
      ageRangeGroup.classList.remove("is-disabled");
      const num = Number(val);
      if (Number.isFinite(num) && num >= 5 && num <= 110) {
        const bracket = mapAgeToRange(num);
        const match = surveyForm.querySelector(`input[name="ageRange"][value="${bracket}"]`);
        if (match) match.checked = true;
      }
      clearError("err-age", ageWriteIn);
    }
    updateProgress();
  });

  surveyForm.querySelectorAll('input[name="ageRange"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      ageUnspecified.checked = false;
      ageWriteIn.disabled = false;
      clearError("err-age", radio);
      updateProgress();
    });
  });

  ageUnspecified.addEventListener("change", () => {
    if (ageUnspecified.checked) {
      ageWriteIn.value = "";
      ageWriteIn.disabled = true;
      ageRangeGroup.classList.add("is-disabled");
      surveyForm.querySelectorAll('input[name="ageRange"]').forEach((r) => (r.checked = false));
      clearError("err-age", ageUnspecified);
    } else {
      ageWriteIn.disabled = false;
      ageRangeGroup.classList.remove("is-disabled");
    }
    updateProgress();
  });

  // Gender "อื่น ๆ" write-in toggle
  surveyForm.querySelectorAll('input[name="gender"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      clearError("err-gender", radio);
      const isOther = radio.value === "อื่น ๆ" && radio.checked;
      genderOtherWrap.hidden = !isOther;
      if (!isOther) genderOtherText.value = "";
      updateProgress();
    });
  });

  // AI Used checkboxes mutual logic with "ไม่เคยใช้งานมาก่อน"
  const aiCheckboxes = Array.from(surveyForm.querySelectorAll('input[name="aiUsed"]'));
  aiCheckboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      if (cb === aiNoneCheck && cb.checked) {
        aiCheckboxes.forEach((other) => {
          if (other !== aiNoneCheck) other.checked = false;
        });
      } else if (cb !== aiNoneCheck && cb.checked) {
        aiNoneCheck.checked = false;
      }
      clearError("err-aiUsed", cb);
      updateProgress();
    });
  });

  aiOtherWriteIn.addEventListener("input", () => {
    if (aiOtherWriteIn.value.trim()) {
      aiNoneCheck.checked = false;
      clearError("err-aiUsed", aiOtherWriteIn);
    }
    updateProgress();
  });

  // Core radio listeners
  ["appPreference", "modelPreference", "naturalness"].forEach((name) => {
    surveyForm.querySelectorAll(`input[name="${name}"]`).forEach((radio) => {
      radio.addEventListener("change", () => {
        clearError(`err-${name}`, radio);
        updateProgress();
      });
    });
  });

  // ---------- Star Rating Interactive Systems ----------
  function spawnSparkles(x, y, color = "#f26c9a") {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < 6; i++) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      el.setAttribute("viewBox", "0 0 24 24");
      el.classList.add("spark-pop");
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.color = i % 2 === 0 ? color : "#ffba33";
      el.innerHTML = `<path fill="currentColor" d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>`;
      const angle = (Math.PI * 2 * i) / 6 + (Math.random() * 0.4 - 0.2);
      const dist = 26 + Math.random() * 24;
      el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      el.style.setProperty("--dy", `${Math.sin(angle) * dist - 10}px`);
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 720);
    }
  }

  function setupStarRating({
    starContainerId,
    legendContainerId,
    hiddenInput,
    badgeEl,
    labels,
    errorId,
    onSelect,
  }) {
    const starRow = document.getElementById(starContainerId);
    const legend = document.getElementById(legendContainerId);
    const stars = Array.from(starRow.querySelectorAll(".star-btn"));
    const legendItems = Array.from(legend.querySelectorAll(".legend-item"));

    function paintStars(hoverVal, selectedVal) {
      const target = hoverVal || selectedVal || 0;
      stars.forEach((btn) => {
        const v = Number(btn.dataset.value);
        btn.classList.toggle("is-hovered", Boolean(hoverVal && v <= hoverVal));
        btn.classList.toggle("is-active", Boolean(selectedVal && v <= selectedVal && (!hoverVal || v <= target)));
      });
    }

    function applyValue(val, eventOrigin) {
      hiddenInput.value = String(val);
      badgeEl.textContent = `${val} ดาว : ${labels[val]}`;
      badgeEl.classList.add("is-selected");
      legendItems.forEach((item) => {
        item.classList.toggle("is-selected", Number(item.dataset.value) === val);
      });
      paintStars(0, val);
      clearError(errorId, hiddenInput);
      if (eventOrigin) {
        const rect = eventOrigin.getBoundingClientRect();
        spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      if (onSelect) onSelect(val);
      updateProgress();
    }

    stars.forEach((btn) => {
      const v = Number(btn.dataset.value);
      btn.addEventListener("mouseenter", () => paintStars(v, Number(hiddenInput.value)));
      btn.addEventListener("mouseleave", () => paintStars(0, Number(hiddenInput.value)));
      btn.addEventListener("click", () => applyValue(v, btn));
    });

    legendItems.forEach((item) => {
      const v = Number(item.dataset.value);
      item.addEventListener("click", () => applyValue(v, item));
    });

    return {
      reset() {
        hiddenInput.value = "";
        badgeEl.textContent = "ยังไม่ได้ให้คะแนน";
        badgeEl.classList.remove("is-selected");
        legendItems.forEach((item) => item.classList.remove("is-selected"));
        paintStars(0, 0);
      },
    };
  }

  const projectStarCtrl = setupStarRating({
    starContainerId: "projectStars",
    legendContainerId: "projectLegend",
    hiddenInput: projectRatingInput,
    badgeEl: projectRatingBadge,
    labels: PROJECT_LABELS,
    errorId: "err-projectRating",
  });

  const satStarCtrl = setupStarRating({
    starContainerId: "satisfactionStars",
    legendContainerId: "satisfactionLegend",
    hiddenInput: satisfactionInput,
    badgeEl: satisfactionBadge,
    labels: SATISFACTION_LABELS,
    errorId: "err-satisfaction",
  });

  // ---------- Progress Calculation ----------
  function hasAgeFilled() {
    if (ageUnspecified.checked) return true;
    const exact = ageWriteIn.value.trim();
    const range = surveyForm.querySelector('input[name="ageRange"]:checked');
    return exact !== "" || Boolean(range);
  }

  function hasAiFilled() {
    const checked = surveyForm.querySelectorAll('input[name="aiUsed"]:checked').length > 0;
    return checked || aiOtherWriteIn.value.trim() !== "";
  }

  function updateProgress() {
    const checks = [
      Boolean(surveyForm.querySelector('input[name="consent"]:checked')),
      hasAgeFilled(),
      Boolean(surveyForm.querySelector('input[name="gender"]:checked')),
      hasAiFilled(),
      Boolean(surveyForm.querySelector('input[name="appPreference"]:checked')),
      Boolean(surveyForm.querySelector('input[name="modelPreference"]:checked')) &&
        Boolean(surveyForm.querySelector('input[name="naturalness"]:checked')),
      Boolean(projectRatingInput.value) && Boolean(satisfactionInput.value),
    ];
    const done = checks.filter(Boolean).length;
    const pct = Math.round((done / checks.length) * 100);
    progressFill.style.width = `${pct}%`;
    progressLabel.textContent = `ความคืบหน้า ${done} / ${checks.length} หมวด`;
  }

  // ---------- Validation ----------
  function setError(errorId, message, anchorEl) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = message;
    if (anchorEl) {
      const card = anchorEl.closest(".form-card");
      if (card) {
        card.classList.remove("has-error");
        void card.offsetWidth;
        card.classList.add("has-error");
      }
    }
  }

  function clearError(errorId, anchorEl) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = "";
    if (anchorEl) {
      const card = anchorEl.closest(".form-card");
      if (card && !card.querySelector(".field-error:not(:empty)")) {
        card.classList.remove("has-error");
      }
    }
  }

  function validateForm() {
    let firstErrorEl = null;
    function fail(errorId, msg, el) {
      setError(errorId, msg, el);
      if (!firstErrorEl) firstErrorEl = el.closest(".form-card") || el;
    }

    const consent = surveyForm.querySelector('input[name="consent"]:checked');
    if (!consent) {
      fail("err-consent", "กรุณาเลือกความยินยอมเปิดเผยข้อมูลก่อนส่งแบบสอบถามค่ะ", surveyForm.querySelector('input[name="consent"]'));
    }

    if (!hasAgeFilled()) {
      fail("err-age", "กรุณากรอกอายุ เลือกช่วงอายุ หรือติ๊ก “ไม่ระบุอายุ” ค่ะ", ageWriteIn);
    } else if (!ageUnspecified.checked && ageWriteIn.value.trim() !== "") {
      const num = Number(ageWriteIn.value);
      if (!Number.isFinite(num) || num < 5 || num > 110) {
        fail("err-age", "กรุณากรอกอายุระหว่าง 5 ถึง 110 ปีค่ะ", ageWriteIn);
      }
    }

    const gender = surveyForm.querySelector('input[name="gender"]:checked');
    if (!gender) {
      fail("err-gender", "กรุณาเลือกเพศค่ะ", surveyForm.querySelector('input[name="gender"]'));
    }

    if (!hasAiFilled()) {
      fail("err-aiUsed", "กรุณาติ๊กเลือก AI ที่เคยใช้งาน หรือพิมพ์ระบุเพิ่มเติมอย่างน้อย 1 รายการค่ะ", aiOtherWriteIn);
    }

    const appPref = surveyForm.querySelector('input[name="appPreference"]:checked');
    if (!appPref) {
      fail("err-appPreference", "กรุณาเลือกรูปแบบแอปที่คุณชอบค่ะ", surveyForm.querySelector('input[name="appPreference"]'));
    }

    const modelPref = surveyForm.querySelector('input[name="modelPreference"]:checked');
    if (!modelPref) {
      fail("err-modelPreference", "กรุณาเลือกรูปแบบโมเดล Live2D หรือ Full 3D ค่ะ", surveyForm.querySelector('input[name="modelPreference"]'));
    }

    const naturalness = surveyForm.querySelector('input[name="naturalness"]:checked');
    if (!naturalness) {
      fail("err-naturalness", "กรุณาประเมินความเป็นธรรมชาติในการตอบค่ะ", surveyForm.querySelector('input[name="naturalness"]'));
    }

    if (!projectRatingInput.value) {
      fail("err-projectRating", "กรุณาให้ดาวทั้งโปรเจกต์ (1-5 ดาว) ค่ะ", projectRatingInput);
    }

    if (!satisfactionInput.value) {
      fail("err-satisfaction", "กรุณาให้คะแนนความพึงพอใจในการใช้งาน (1-4 ดาว) ค่ะ", satisfactionInput);
    }

    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  }

  // ---------- Form Submission ----------
  function collectFormData() {
    const consent = surveyForm.querySelector('input[name="consent"]:checked').value;

    let ageExact = null;
    let ageRange = "ไม่ระบุ";
    let ageDisplay = "ไม่ระบุ";
    if (!ageUnspecified.checked) {
      const rawAge = ageWriteIn.value.trim();
      const checkedRange = surveyForm.querySelector('input[name="ageRange"]:checked');
      if (rawAge !== "") {
        ageExact = Number(rawAge);
        ageRange = checkedRange ? checkedRange.value : mapAgeToRange(ageExact);
        ageDisplay = `${ageExact} ปี (${ageRange})`;
      } else if (checkedRange) {
        ageRange = checkedRange.value;
        ageDisplay = ageRange;
      }
    }

    const genderBase = surveyForm.querySelector('input[name="gender"]:checked').value;
    const genderExtra = genderOtherText.value.trim();
    const gender = genderBase === "อื่น ๆ" && genderExtra ? `อื่น ๆ (${genderExtra})` : genderBase;

    const aiUsed = Array.from(surveyForm.querySelectorAll('input[name="aiUsed"]:checked')).map((el) => el.value);
    const aiOther = aiOtherWriteIn.value.trim();
    if (aiOther) {
      aiUsed.push(aiOther);
    }

    const desiredFeatures = Array.from(surveyForm.querySelectorAll('input[name="desiredFeatures"]:checked')).map(
      (el) => el.value
    );

    return {
      id: `resp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      isDemo: false,
      createdAt: new Date().toISOString(),
      consent,
      ageExact,
      ageRange,
      ageDisplay,
      gender,
      aiUsed,
      vivianImpression: surveyForm.vivianImpression.value.trim(),
      appPreference: surveyForm.querySelector('input[name="appPreference"]:checked').value,
      appPreferenceReason: surveyForm.appPreferenceReason.value.trim(),
      modelPreference: surveyForm.querySelector('input[name="modelPreference"]:checked').value,
      modelPreferenceNote: surveyForm.modelPreferenceNote.value.trim(),
      naturalness: surveyForm.querySelector('input[name="naturalness"]:checked').value,
      desiredFeatures,
      desiredFeaturesOther: surveyForm.desiredFeaturesOther.value.trim(),
      projectRating: Number(projectRatingInput.value),
      satisfactionRating: Number(satisfactionInput.value),
      issuesText: surveyForm.issuesText.value.trim(),
      suggestionsText: surveyForm.suggestionsText.value.trim(),
    };
  }

  function resetAllFormFields() {
    surveyForm.reset();
    ageWriteIn.disabled = false;
    ageRangeGroup.classList.remove("is-disabled");
    genderOtherWrap.hidden = true;
    consentNotice.hidden = true;
    projectStarCtrl.reset();
    satStarCtrl.reset();
    document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll(".form-card.has-error").forEach((el) => el.classList.remove("has-error"));
    updateProgress();
  }

  btnResetForm.addEventListener("click", () => {
    resetAllFormFields();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  surveyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const entry = collectFormData();
    const originalBtnHtml = btnSubmitForm.innerHTML;
    btnSubmitForm.disabled = true;
    btnSubmitForm.textContent = "กำลังบันทึกลง D1...";
    setDbBanner("");

    try {
      const res = await fetch("/api/responses", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(entry),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `บันทึกลง Cloudflare D1 ไม่สำเร็จ (HTTP ${res.status})`);
      }

      dbConnected = true;
      updateDbBadge();
      responses = await fetchResponsesFromD1();
      updateNavBadge();
      launchConfetti();

      modalSummary.innerHTML = `
        <div><strong>ความยินยอม:</strong> ${escapeHtml(entry.consent)}</div>
        <div><strong>อายุ / เพศ:</strong> ${escapeHtml(entry.ageDisplay)} / ${escapeHtml(entry.gender)}</div>
        <div><strong>แพลตฟอร์ม &amp; โมเดล:</strong> ${escapeHtml(entry.appPreference)} / ${escapeHtml(entry.modelPreference)}</div>
        <div><strong>คะแนนโปรเจกต์:</strong> ${entry.projectRating} ดาว (${escapeHtml(PROJECT_LABELS[entry.projectRating])})</div>
        <div><strong>ความพึงพอใจ:</strong> ${entry.satisfactionRating} ดาว (${escapeHtml(SATISFACTION_LABELS[entry.satisfactionRating])})</div>
      `;
      successModal.hidden = false;
      resetAllFormFields();
    } catch (err) {
      dbConnected = false;
      setDbBanner(`บันทึกไม่สำเร็จ (ไม่ได้บันทึกลง browser cache): ${err.message}`);
      updateDbBadge();
      formDbError?.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      btnSubmitForm.disabled = false;
      btnSubmitForm.innerHTML = originalBtnHtml;
    }
  });

  btnCloseModal.addEventListener("click", () => {
    successModal.hidden = true;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btnGoToStats.addEventListener("click", () => {
    successModal.hidden = true;
    switchTab("stats");
  });

  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      successModal.hidden = true;
    }
  });

  // ---------- Statistical Engine (Mean & Standard Deviation) ----------
  function computeStats(values) {
    const nums = values.filter((v) => typeof v === "number" && Number.isFinite(v));
    const n = nums.length;
    if (n === 0) {
      return { n: 0, mean: null, sampleSD: null, popSD: null, min: null, max: null };
    }
    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;
    const sqDiffSum = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
    const popSD = Math.sqrt(sqDiffSum / n);
    const sampleSD = n >= 2 ? Math.sqrt(sqDiffSum / (n - 1)) : null;
    return {
      n,
      mean,
      sampleSD,
      popSD,
      min: Math.min(...nums),
      max: Math.max(...nums),
    };
  }

  function fmt(num, digits = 2) {
    return typeof num === "number" && Number.isFinite(num) ? num.toFixed(digits) : "—";
  }

  function updateNavBadge() {
    navResponseCount.textContent = String(responses.length);
    navResponseCount.classList.remove("bump");
    void navResponseCount.offsetWidth;
    navResponseCount.classList.add("bump");
  }

  function renderDistBars(containerId, items, total, tone = "pink") {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!total) {
      container.innerHTML = `<div class="empty-state">ยังไม่มีข้อมูล</div>`;
      return;
    }
    container.innerHTML = items
      .map(({ label, count }) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const barClass = tone === "lilac" ? "dist-bar-fill lilac" : "dist-bar-fill";
        return `
          <div class="dist-row">
            <div class="dist-top">
              <span class="dist-name">${escapeHtml(label)}</span>
              <span class="dist-stat">${count} คน (${pct}%)</span>
            </div>
            <div class="dist-bar-bg">
              <div class="${barClass}" data-width="${pct}%" style="width: 0%"></div>
            </div>
          </div>
        `;
      })
      .join("");

    requestAnimationFrame(() => {
      container.querySelectorAll(".dist-bar-fill").forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    });
  }

  function countCategories(list, getter, fixedOrder = []) {
    const map = new Map();
    fixedOrder.forEach((k) => map.set(k, 0));
    list.forEach((item) => {
      const val = getter(item);
      if (Array.isArray(val)) {
        val.forEach((v) => map.set(v, (map.get(v) || 0) + 1));
      } else if (val) {
        map.set(val, (map.get(val) || 0) + 1);
      }
    });
    return Array.from(map.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => (fixedOrder.length ? 0 : b.count - a.count));
  }

  function renderStats() {
    const consentOnly = filterConsentOnly.checked;
    const activeList = consentOnly ? responses.filter((r) => r.consent === "ยินยอม") : responses;
    const total = activeList.length;

    const hasDemo = responses.some((r) => r.isDemo);
    demoNotice.hidden = !hasDemo;

    const consentCount = responses.filter((r) => r.consent === "ยินยอม").length;
    const consentPct = responses.length ? Math.round((consentCount / responses.length) * 100) : 0;

    document.getElementById("statsSubtitle").textContent = consentOnly
      ? `แสดงเฉพาะผู้ยินยอมเปิดเผยข้อมูล (${total} จากทั้งหมด ${responses.length} คำตอบ)`
      : `กำลังแสดงข้อมูลจากทั้งหมด ${responses.length} คำตอบ`;

    // KPIs
    document.getElementById("kpiTotalN").textContent = String(total);
    document.getElementById("kpiConsentRate").textContent = `ยินยอม ${consentCount} คน (${consentPct}%)`;

    const projStats = computeStats(activeList.map((r) => r.projectRating));
    document.getElementById("kpiProjMean").textContent = fmt(projStats.mean, 2);
    document.getElementById("kpiProjSD").textContent =
      projStats.sampleSD !== null ? fmt(projStats.sampleSD, 2) : projStats.n === 1 ? "ต้อง N>=2" : "—";
    document.getElementById("kpiProjPopSD").textContent = fmt(projStats.popSD, 2);

    const satStats = computeStats(activeList.map((r) => r.satisfactionRating));
    document.getElementById("kpiSatMean").textContent = fmt(satStats.mean, 2);
    document.getElementById("kpiSatSD").textContent =
      satStats.sampleSD !== null ? fmt(satStats.sampleSD, 2) : satStats.n === 1 ? "ต้อง N>=2" : "—";
    document.getElementById("kpiSatPopSD").textContent = fmt(satStats.popSD, 2);

    const ageStats = computeStats(activeList.map((r) => r.ageExact));
    document.getElementById("kpiAgeMean").textContent = ageStats.mean !== null ? ageStats.mean.toFixed(1) : "—";
    document.getElementById("kpiAgeSD").textContent =
      ageStats.sampleSD !== null ? fmt(ageStats.sampleSD, 2) : ageStats.n === 1 ? "ต้อง N>=2" : "—";
    document.getElementById("kpiAgeN").textContent = `n = ${ageStats.n}`;

    // Project Rating 1-5 distribution
    const projDist = [5, 4, 3, 2, 1].map((star) => ({
      label: `${star} ดาว : ${PROJECT_LABELS[star]}`,
      count: activeList.filter((r) => r.projectRating === star).length,
    }));
    renderDistBars("projDistList", projDist, total, "pink");

    // Satisfaction 1-4 distribution
    const satDist = [4, 3, 2, 1].map((star) => ({
      label: `${star} ดาว : ${SATISFACTION_LABELS[star]}`,
      count: activeList.filter((r) => r.satisfactionRating === star).length,
    }));
    renderDistBars("satDistList", satDist, total, "lilac");

    // Technical & Experience distributions
    renderDistBars(
      "appPrefDist",
      countCategories(activeList, (r) => r.appPreference, [
        "Web App (เว็บแอป)",
        "Native App (แอปติดตั้ง)",
        "ชอบทั้งสองแบบ",
      ]),
      total,
      "pink"
    );

    renderDistBars(
      "modelPrefDist",
      countCategories(activeList, (r) => r.modelPreference, [
        "Live2D Model",
        "Full 3D Model",
        "สลับได้ตามสเปค (Hybrid)",
      ]),
      total,
      "lilac"
    );

    renderDistBars(
      "naturalnessDist",
      countCategories(activeList, (r) => r.naturalness, [
        "เป็นธรรมชาติมาก เหมือนคุยกับคนจริง",
        "ค่อนข้างเป็นธรรมชาติ",
        "ปานกลาง ยังดูเป็น AI อยู่บ้าง",
        "อยากให้ปรับปรุงจังหวะและน้ำเสียง",
      ]),
      total,
      "pink"
    );

    renderDistBars(
      "aiUsedDist",
      countCategories(activeList, (r) => r.aiUsed),
      total,
      "lilac"
    );

    renderDistBars(
      "genderDist",
      countCategories(activeList, (r) => (r.gender.startsWith("อื่น ๆ") ? "อื่น ๆ" : r.gender), [
        "หญิง",
        "ชาย",
        "อื่น ๆ",
        "ไม่ระบุ",
      ]),
      total,
      "pink"
    );

    // Individual feed
    document.getElementById("responsesShownCount").textContent = `${total} รายการ`;
    const feed = document.getElementById("responsesFeed");
    if (!activeList.length) {
      feed.innerHTML = `<div class="empty-state">ยังไม่มีข้อมูลคำตอบในหมวดนี้ ลองส่งแบบสอบถามหรือกด “เติมข้อมูลตัวอย่าง” ด้านบนค่ะ</div>`;
      return;
    }

    feed.innerHTML = activeList
      .map((r) => {
        const dateStr = formatThaiTime(r.createdAt);
        const notes = [];
        if (r.vivianImpression) notes.push(`<strong>ความเห็นต่อ Vivian:</strong> ${escapeHtml(r.vivianImpression)}`);
        if (r.issuesText) notes.push(`<strong>ปัญหาที่พบ:</strong> ${escapeHtml(r.issuesText)}`);
        if (r.suggestionsText) notes.push(`<strong>ข้อเสนอแนะ:</strong> ${escapeHtml(r.suggestionsText)}`);

        return `
          <div class="resp-item">
            <div class="resp-head">
              <div class="resp-badges">
                <span class="mini-badge ${r.consent === "ยินยอม" ? "mint" : "lilac"}">${escapeHtml(r.consent)}</span>
                <span class="mini-badge">โปรเจกต์ ${r.projectRating} ดาว (${escapeHtml(PROJECT_LABELS[r.projectRating] || "")})</span>
                <span class="mini-badge">พึงพอใจ ${r.satisfactionRating} ดาว (${escapeHtml(SATISFACTION_LABELS[r.satisfactionRating] || "")})</span>
                ${r.isDemo ? '<span class="mini-badge demo">ข้อมูลตัวอย่าง</span>' : ""}
              </div>
              <span class="resp-time">${escapeHtml(dateStr)}</span>
            </div>
            <div class="resp-grid">
              <span><strong>อายุ:</strong> ${escapeHtml(r.ageDisplay)}</span>
              <span><strong>เพศ:</strong> ${escapeHtml(r.gender)}</span>
              <span><strong>แอป:</strong> ${escapeHtml(r.appPreference)}</span>
              <span><strong>โมเดล:</strong> ${escapeHtml(r.modelPreference)}</span>
              <span><strong>ธรรมชาติ:</strong> ${escapeHtml(r.naturalness)}</span>
            </div>
            <div class="resp-grid">
              <span><strong>AI ที่เคยใช้:</strong> ${escapeHtml((r.aiUsed || []).join(", ") || "ไม่มี")}</span>
            </div>
            ${notes.length ? `<div class="resp-notes">${notes.join("<br/>")}</div>` : ""}
          </div>
        `;
      })
      .join("");
  }

  filterConsentOnly.addEventListener("change", renderStats);

  btnLoadDemo.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/responses/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items: SAMPLE_RESPONSES }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `เติมข้อมูลตัวอย่างลง D1 ไม่สำเร็จ (HTTP ${res.status})`);
      }
      responses = await fetchResponsesFromD1();
      updateNavBadge();
      renderStats();
    } catch (err) {
      setDbBanner(`เติมข้อมูลตัวอย่างไม่สำเร็จ: ${err.message}`);
    }
  });

  btnClearAllData.addEventListener("click", async () => {
    if (!responses.length) return;
    if (window.confirm("ต้องการล้างข้อมูลคำตอบทั้งหมดในฐานข้อมูล D1 ใช่หรือไม่?")) {
      try {
        const res = await fetch("/api/responses", { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || `ล้างข้อมูล D1 ไม่สำเร็จ (HTTP ${res.status})`);
        }
        responses = await fetchResponsesFromD1();
        updateNavBadge();
        renderStats();
      } catch (err) {
        setDbBanner(`ล้างข้อมูลไม่สำเร็จ: ${err.message}`);
      }
    }
  });

  // ---------- Export Helpers (CSV with UTF-8 BOM & JSON) ----------
  function downloadBlob(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  btnExportCsv.addEventListener("click", () => {
    const headers = [
      "id",
      "createdAt",
      "isDemo",
      "consent",
      "ageExact",
      "ageRange",
      "gender",
      "aiUsed",
      "vivianImpression",
      "appPreference",
      "appPreferenceReason",
      "modelPreference",
      "modelPreferenceNote",
      "naturalness",
      "desiredFeatures",
      "desiredFeaturesOther",
      "projectRating",
      "projectRatingLabel",
      "satisfactionRating",
      "satisfactionRatingLabel",
      "issuesText",
      "suggestionsText",
    ];

    const escapeCsv = (val) => {
      const str = val === null || val === undefined ? "" : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = responses.map((r) =>
      [
        r.id,
        r.createdAt,
        r.isDemo,
        r.consent,
        r.ageExact ?? "",
        r.ageRange,
        r.gender,
        (r.aiUsed || []).join(" | "),
        r.vivianImpression,
        r.appPreference,
        r.appPreferenceReason,
        r.modelPreference,
        r.modelPreferenceNote,
        r.naturalness,
        (r.desiredFeatures || []).join(" | "),
        r.desiredFeaturesOther,
        r.projectRating,
        PROJECT_LABELS[r.projectRating] || "",
        r.satisfactionRating,
        SATISFACTION_LABELS[r.satisfactionRating] || "",
        r.issuesText,
        r.suggestionsText,
      ]
        .map(escapeCsv)
        .join(",")
    );

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    downloadBlob(csvContent, "celestia-vivian-survey.csv", "text/csv;charset=utf-8;");
  });

  btnExportJson.addEventListener("click", () => {
    const projStats = computeStats(responses.map((r) => r.projectRating));
    const satStats = computeStats(responses.map((r) => r.satisfactionRating));
    const payload = {
      studio: "Celestia Studio",
      project: "Vivian AI Companion Survey",
      exportedAt: new Date().toISOString(),
      summary: {
        totalResponses: responses.length,
        projectRatingStats: projStats,
        satisfactionRatingStats: satStats,
      },
      responses,
    };
    downloadBlob(JSON.stringify(payload, null, 2), "celestia-vivian-survey.json", "application/json");
  });

  // ---------- Utilities ----------
  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatThaiTime(iso) {
    try {
      const d = new Date(iso);
      return d.toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  }

  // ---------- Subtle Ambient Floating Petals / Stars Canvas ----------
  function initAmbientParticles() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const colors = ["#ffb3cc", "#ffd6e4", "#d9c2ff", "#ffe3c8"];
    const particles = Array.from({ length: 18 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 3 + Math.random() * 4.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.25 - Math.random() * 0.35,
      alpha: 0.28 + Math.random() * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      isStar: Math.random() > 0.55,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.015,
    }));

    function drawStar(cx, cy, r, rot) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * r * 1.4, Math.sin(angle) * r * 1.4);
        ctx.lineTo(Math.cos(angle + Math.PI / 4) * r * 0.45, Math.sin(angle + Math.PI / 4) * r * 0.45);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        if (p.y < -20) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.isStar) {
          drawStar(p.x, p.y, p.r, p.rot);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ---------- Celebratory Pastel Confetti on Submit ----------
  function launchConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    canvas.hidden = false;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#f26c9a", "#ffb3cc", "#c7a4ff", "#ffba33", "#7ed6b9"];
    const pieces = Array.from({ length: 72 }, () => ({
      x: canvas.width * (0.2 + Math.random() * 0.6),
      y: canvas.height * 0.55,
      vx: (Math.random() - 0.5) * 11,
      vy: -6 - Math.random() * 9,
      size: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const c of pieces) {
        c.vy += 0.28;
        c.x += c.vx;
        c.y += c.vy;
        c.rot += c.vRot;
        c.life -= 0.011;
        if (c.life > 0 && c.y < canvas.height + 30) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, c.life);
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rot);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 3, c.size, c.size * 0.65);
          ctx.restore();
        }
      }
      if (alive) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.hidden = true;
      }
    }
    requestAnimationFrame(frame);
  }

  // ---------- Initialize ----------
  updateNavBadge();
  updateProgress();
  updateDbBadge();
  initScrollReveal();
  initAmbientParticles();
  requestAnimationFrame(() => updateGlider(tabBtnForm));
  fetchResponsesFromD1().then((fresh) => {
    responses = fresh;
    updateNavBadge();
    if (!viewStats.hidden) renderStats();
  });
})();
