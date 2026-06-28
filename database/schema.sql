-- ============================================================
-- CodeQuest - Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE: users
-- ============================================================
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(50)  UNIQUE NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar        TEXT DEFAULT 'https://api.dicebear.com/7.x/pixel-art/svg?seed=codequest',
  xp_total      INT  DEFAULT 0 CHECK (xp_total  >= 0),
  nivel         INT  DEFAULT 1 CHECK (nivel      >= 1),
  monedas       INT  DEFAULT 0 CHECK (monedas    >= 0),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: worlds
-- ============================================================
CREATE TABLE worlds (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre      VARCHAR(100) NOT NULL,
  descripcion TEXT,
  icono       TEXT DEFAULT '🌍',
  color       TEXT DEFAULT '#6366f1',
  orden       INT  UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: levels
-- ============================================================
CREATE TABLE levels (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  world_id           UUID NOT NULL REFERENCES worlds(id) ON DELETE CASCADE,
  titulo             VARCHAR(200) NOT NULL,
  descripcion        TEXT,
  dificultad         VARCHAR(20) NOT NULL CHECK (dificultad IN ('facil','medio','dificil','experto','leyenda')),
  tiempo_limite      INT  NOT NULL DEFAULT 60,
  xp_recompensa      INT  NOT NULL DEFAULT 10,
  monedas_recompensa INT  NOT NULL DEFAULT 5,
  orden              INT  NOT NULL,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: challenges
-- ============================================================
CREATE TABLE challenges (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id          UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  tipo              VARCHAR(20) NOT NULL CHECK (tipo IN ('predict','complete','fix','sort','multiple','truefalse','match','boss')),
  pregunta          TEXT NOT NULL,
  codigo            TEXT,
  respuesta_correcta TEXT NOT NULL,
  explicacion       TEXT,
  metadata_json     JSONB DEFAULT '{}',
  orden             INT  DEFAULT 1,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: user_progress
-- ============================================================
CREATE TABLE user_progress (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  level_id       UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  completed      BOOLEAN DEFAULT FALSE,
  best_score     INT DEFAULT 0,
  best_time      INT,
  attempts_count INT DEFAULT 0,
  completed_at   TIMESTAMPTZ,
  UNIQUE(user_id, level_id)
);

-- ============================================================
-- TABLE: achievements
-- ============================================================
CREATE TABLE achievements (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        VARCHAR(100) NOT NULL,
  descripcion   TEXT,
  icono         TEXT DEFAULT '🏆',
  xp_bonus      INT DEFAULT 0,
  monedas_bonus INT DEFAULT 0,
  condicion     VARCHAR(50) NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE: user_achievements
-- ============================================================
CREATE TABLE user_achievements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id)        ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================================
-- TABLE: attempts
-- ============================================================
CREATE TABLE attempts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID    NOT NULL REFERENCES users(id)      ON DELETE CASCADE,
  challenge_id UUID    NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  answer       TEXT,
  is_correct   BOOLEAN NOT NULL DEFAULT FALSE,
  time_taken   INT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_levels_world_id           ON levels(world_id);
CREATE INDEX idx_challenges_level_id       ON challenges(level_id);
CREATE INDEX idx_user_progress_user_id     ON user_progress(user_id);
CREATE INDEX idx_user_progress_level_id    ON user_progress(level_id);
CREATE INDEX idx_attempts_user_id          ON attempts(user_id);
CREATE INDEX idx_attempts_challenge_id     ON attempts(challenge_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_users_xp_total           ON users(xp_total DESC);

-- ============================================================
-- FUNCTION: auto-calculate nivel from xp_total
-- ============================================================
CREATE OR REPLACE FUNCTION calculate_nivel(xp INT)
RETURNS INT AS $$
BEGIN
  IF    xp >= 10000 THEN RETURN 20;
  ELSIF xp >= 6000  THEN RETURN 18;
  ELSIF xp >= 4000  THEN RETURN 16;
  ELSIF xp >= 2500  THEN RETURN 14;
  ELSIF xp >= 1800  THEN RETURN 12;
  ELSIF xp >= 1200  THEN RETURN 10;
  ELSIF xp >= 800   THEN RETURN 8;
  ELSIF xp >= 500   THEN RETURN 6;
  ELSIF xp >= 250   THEN RETURN 4;
  ELSIF xp >= 100   THEN RETURN 2;
  ELSE RETURN 1;
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
