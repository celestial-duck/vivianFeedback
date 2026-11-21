-- Celestia Studio x Vivian Feedback Survey (Cloudflare D1 / SQLite)

CREATE TABLE IF NOT EXISTS survey_responses (
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
);

CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_survey_consent ON survey_responses(consent);
