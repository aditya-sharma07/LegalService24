/*
  # Initial Schema for LegalService24

  1. New Tables
    - `profiles`
      - Stores user profile information for both lawyers and clients
      - Links to Supabase auth.users
    - `lawyers`
      - Stores lawyer-specific information
      - Links to profiles
    - `appointments`
      - Stores appointment information
      - Links appointments between clients and lawyers
    - `documents`
      - Stores document information
      - Links documents to users
    - `testimonials`
      - Stores client testimonials
    - `contact_messages`
      - Stores contact form submissions
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lawyers table
CREATE TABLE lawyers (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  specialization text NOT NULL,
  hourly_rate decimal NOT NULL,
  bio text,
  years_of_experience integer DEFAULT 0,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  lawyer_id uuid REFERENCES lawyers(id) ON DELETE CASCADE,
  appointment_type text NOT NULL CHECK (appointment_type IN ('online', 'home', 'office')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create documents table
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  document_type text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'under_review', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  text text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create contact messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Lawyers policies
CREATE POLICY "Lawyer profiles are viewable by everyone"
  ON lawyers FOR SELECT
  USING (true);

CREATE POLICY "Lawyers can update own profile"
  ON lawyers FOR UPDATE
  USING (auth.uid() = id);

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (
    auth.uid() = client_id OR 
    auth.uid() = lawyer_id
  );

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (
    auth.uid() = client_id OR 
    auth.uid() = lawyer_id
  );

-- Documents policies
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  USING (auth.uid() = owner_id);

-- Testimonials policies
CREATE POLICY "Published testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can create own testimonials"
  ON testimonials FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update own testimonials"
  ON testimonials FOR UPDATE
  USING (auth.uid() = client_id);

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
  ON contact_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM lawyers 
      WHERE id = auth.uid()
    )
  );