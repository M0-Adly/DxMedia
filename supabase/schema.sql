-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('images','motion','video','ads','web','ai','data','other')),
  image_url TEXT,
  project_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('hero_clients', '150'),
  ('hero_projects', '420'),
  ('hero_years', '6');

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);

-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access for projects, testimonials, settings
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Auth insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth read messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth update messages" ON messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth manage settings" ON settings FOR ALL USING (auth.role() = 'authenticated');

-- Public insert for messages (contact form)
CREATE POLICY "Public insert messages" ON messages FOR INSERT WITH CHECK (true);

-- Storage policy
CREATE POLICY "Public read storage" ON storage.objects FOR SELECT USING (bucket_id = 'projects');
CREATE POLICY "Auth upload storage" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete storage" ON storage.objects FOR DELETE USING (bucket_id = 'projects' AND auth.role() = 'authenticated');
