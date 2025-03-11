/*
  # Blog System Schema

  1. New Tables
    - articles: Stores blog posts with metadata
    - article_tags: Stores available tags
    - article_to_tags: Many-to-many relationship between articles and tags

  2. Security
    - Enable RLS on all tables
    - Add policies for article visibility and management
    - Add policies for tag management
*/

-- Create articles table if it doesn't exist
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table if it doesn't exist
CREATE TABLE IF NOT EXISTS article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

-- Create article to tags relationship table if it doesn't exist
CREATE TABLE IF NOT EXISTS article_to_tags (
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES article_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
  ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
  ALTER TABLE article_to_tags ENABLE ROW LEVEL SECURITY;
END $$;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Published articles are viewable by everyone" ON articles;
  DROP POLICY IF EXISTS "Authors can manage their own articles" ON articles;
  DROP POLICY IF EXISTS "Tags are viewable by everyone" ON article_tags;
  DROP POLICY IF EXISTS "Only authors can manage tags" ON article_tags;
  DROP POLICY IF EXISTS "Article tag relationships are viewable by everyone" ON article_to_tags;
  DROP POLICY IF EXISTS "Authors can manage their article tags" ON article_to_tags;
END $$;

-- Recreate policies for articles
CREATE POLICY "Published articles are viewable by everyone"
  ON articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authors can manage their own articles"
  ON articles FOR ALL
  USING (auth.uid() = author_id);

-- Recreate policies for tags
CREATE POLICY "Tags are viewable by everyone"
  ON article_tags FOR SELECT
  USING (true);

CREATE POLICY "Only authors can manage tags"
  ON article_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM lawyers 
      WHERE id = auth.uid()
    )
  );

-- Recreate policies for article_to_tags
CREATE POLICY "Article tag relationships are viewable by everyone"
  ON article_to_tags FOR SELECT
  USING (true);

CREATE POLICY "Authors can manage their article tags"
  ON article_to_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM articles
      WHERE id = article_id AND author_id = auth.uid()
    )
  );