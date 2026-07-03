-- Abzy Properties Database Schema
-- Run this script to initialize your MySQL database

CREATE DATABASE IF NOT EXISTS abzy_properties;
USE abzy_properties;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT,
  type ENUM('residential', 'commercial', 'land') NOT NULL,
  location VARCHAR(255) NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  bedrooms INT,
  bathrooms INT,
  area_sqft INT,
  verified BOOLEAN DEFAULT FALSE,
  agent_name VARCHAR(255),
  agent_phone VARCHAR(20),
  agent_email VARCHAR(255),
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  amenities JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_location (location),
  INDEX idx_price (price),
  FULLTEXT idx_search (title, location, description)
);

-- Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  INDEX idx_property (property_id)
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  property_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  message LONGTEXT,
  status ENUM('new', 'contacted', 'scheduled', 'completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
);

-- Inspections Table
CREATE TABLE IF NOT EXISTS inspections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  inspection_date DATETIME NOT NULL,
  notes TEXT,
  status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_user (user_id),
  INDEX idx_date (inspection_date)
);

-- Saved Listings Table
CREATE TABLE IF NOT EXISTS saved_listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  property_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_property (user_id, property_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  message LONGTEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  agent_id INT,
  message TEXT NOT NULL,
  is_user BOOLEAN DEFAULT TRUE,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user (user_id),
  INDEX idx_created (created_at)
);

-- CEO Info Table
CREATE TABLE IF NOT EXISTS ceo_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ceo_name VARCHAR(255) NOT NULL,
  bio LONGTEXT,
  title VARCHAR(255),
  image_url VARCHAR(500),
  order_number INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CAC Registration Table
CREATE TABLE IF NOT EXISTS cac_registration (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cac_number VARCHAR(100) UNIQUE NOT NULL,
  document_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_type VARCHAR(100) NOT NULL,
  page_url VARCHAR(500),
  property_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
  INDEX idx_event_type (event_type),
  INDEX idx_created (created_at)
);

-- Sessions Table for session management
CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(500) UNIQUE NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_expires (expires_at)
);

-- Insert demo data for testing
INSERT INTO users (email, password_hash, name, phone, role) VALUES
('admin@abzy.com', '$2b$10$YourHashedPasswordHere', 'Admin User', '234-800-1234', 'admin'),
('demo@example.com', '$2b$10$YourHashedPasswordHere', 'Demo User', '234-800-5678', 'user');

INSERT INTO properties (title, description, type, location, price, bedrooms, bathrooms, area_sqft, verified, agent_name, agent_phone, agent_email) VALUES
('Luxury Apartment in Maitama', 'A beautiful 3-bedroom apartment in the heart of Maitama', 'residential', 'Maitama, Abuja', 250000000, 3, 2, 2500, TRUE, 'John Doe', '234-800-1234', 'john@abzy.com'),
('Commercial Space in Wuse', 'Prime commercial space for retail or office use', 'commercial', 'Wuse II, Abuja', 150000000, 0, 0, 3000, TRUE, 'Jane Smith', '234-800-5678', 'jane@abzy.com'),
('Land Plot in Idu', 'Spacious land plot with road access', 'land', 'Idu, Abuja', 80000000, 0, 0, 5000, FALSE, 'Ahmed Hassan', '234-800-9012', 'ahmed@abzy.com');

INSERT INTO ceo_info (ceo_name, bio, title) VALUES
('Ibrahim Shahid Ahmad', 'Visionary leader with 15 years of real estate experience', 'Chief Executive Officer'),
('Abubakar Abba Habib', 'Expert in property management and sales strategy', 'Co-Founder');
