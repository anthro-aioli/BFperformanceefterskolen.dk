-- ========== QUIZ SYSTEM TABLE ==========
CREATE TABLE IF NOT EXISTS quiz_responses (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT
);

CREATE INDEX idx_quiz_student ON quiz_responses(student_name);
CREATE INDEX idx_quiz_created ON quiz_responses(created_at);

-- ========== BRAINSTORM WHITEBOARD TABLE ==========
CREATE TABLE IF NOT EXISTS brainstorm_posts (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT,
  content TEXT NOT NULL,
  category TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  approved_by_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brainstorm_category ON brainstorm_posts(category);
CREATE INDEX idx_brainstorm_approved ON brainstorm_posts(approved_by_admin);
CREATE INDEX idx_brainstorm_created ON brainstorm_posts(created_at);

-- ========== SONG SUGGESTIONS TABLE ==========
CREATE TABLE IF NOT EXISTS song_suggestions (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT,
  song_title TEXT NOT NULL,
  artist TEXT NOT NULL,
  reason TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_song_student ON song_suggestions(student_name);
CREATE INDEX idx_song_created ON song_suggestions(created_at);

-- ========== BREVKASSE TABLE ==========
CREATE TABLE IF NOT EXISTS brevkasse_submissions (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  shareable_with_adults BOOLEAN DEFAULT FALSE,
  is_anonymous BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_brevkasse_created ON brevkasse_submissions(created_at);

-- ========== ENABLE ROW LEVEL SECURITY ==========
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE brainstorm_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brevkasse_submissions ENABLE ROW LEVEL SECURITY;

-- ========== RLS POLICIES ==========
CREATE POLICY "Allow inserts for quiz responses" ON quiz_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts for brainstorm posts" ON brainstorm_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts for song suggestions" ON song_suggestions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inserts for brevkasse" ON brevkasse_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select approved brainstorm posts" ON brainstorm_posts
  FOR SELECT USING (approved_by_admin = true);

CREATE POLICY "Allow select quiz responses" ON quiz_responses
  FOR SELECT USING (true);
