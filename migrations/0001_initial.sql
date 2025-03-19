-- migrations/0001_initial.sql
-- Initial database schema for Lung Cancer Screening Application

-- Users Table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('radiologist', 'administrator', 'technician')),
  password_hash TEXT NOT NULL,
  mfa_enabled BOOLEAN DEFAULT 0,
  mfa_secret TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Patients Table
CREATE TABLE patients (
  id TEXT PRIMARY KEY,
  medical_record_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  date_of_birth INTEGER NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  contact_information TEXT,
  medical_history TEXT,
  smoking_history TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- Studies Table
CREATE TABLE studies (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  study_date INTEGER NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  referring_physician TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE
);

-- Images Table
CREATE TABLE images (
  id TEXT PRIMARY KEY,
  study_id TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('dicom', 'jpeg', 'png')),
  upload_date INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('uploaded', 'processing', 'analyzed', 'error')),
  metadata TEXT, -- JSON string containing DICOM metadata
  image_quality TEXT CHECK (image_quality IN ('low', 'acceptable', 'high')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (study_id) REFERENCES studies (id) ON DELETE CASCADE
);

-- Analysis Results Table
CREATE TABLE analysis_results (
  id TEXT PRIMARY KEY,
  image_id TEXT NOT NULL,
  analysis_date INTEGER NOT NULL,
  findings TEXT, -- JSON string containing detected findings
  confidence_score REAL CHECK (confidence_score BETWEEN 0 AND 1),
  areas_of_concern TEXT, -- JSON string containing coordinates of suspicious areas
  radiologist_review_status TEXT CHECK (radiologist_review_status IN ('pending', 'in_progress', 'completed')),
  radiologist_id TEXT,
  radiologist_notes TEXT,
  diagnosis TEXT CHECK (diagnosis IN ('normal', 'suspicious', 'cancer_detected', 'other_abnormality')),
  review_date INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (image_id) REFERENCES images (id) ON DELETE CASCADE,
  FOREIGN KEY (radiologist_id) REFERENCES users (id)
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_patients_mrn ON patients(medical_record_number);
CREATE INDEX idx_studies_patient_id ON studies(patient_id);
CREATE INDEX idx_studies_status ON studies(status);
CREATE INDEX idx_images_study_id ON images(study_id);
CREATE INDEX idx_images_status ON images(status);
CREATE INDEX idx_analysis_image_id ON analysis_results(image_id);
CREATE INDEX idx_analysis_radiologist_id ON analysis_results(radiologist_id);
CREATE INDEX idx_analysis_review_status ON analysis_results(radiologist_review_status);
