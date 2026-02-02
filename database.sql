CREATE DATABASE IF NOT EXISTS accordia_app;
USE accordia_app;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Items table (owned by a user)
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample data
INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@example.com', '$2b$10$REPLACE_WITH_BCRYPT_HASH', 'admin'),
('Normal User', 'user@example.com', '$2b$10$REPLACE_WITH_BCRYPT_HASH', 'user');

INSERT INTO items (user_id, title, description, category) VALUES
(1, 'Admin Item 1', 'Created by admin', 'General'),
(1, 'Admin Item 2', 'Another admin item', 'Operations'),
(2, 'User Item 1', 'Created by user', 'Personal'),
(2, 'User Item 2', 'Second user item', 'Personal');
