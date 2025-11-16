Tech stacks:-
Backend - Javascript, Node.js, Express.js
Database - MySQL
Frontend - Typescript, Next.js
..............................................
Setup instructions :- 
Frontend - 
Set up project and run the below listed commands - 

-- cd frontend
1. npm install
-- cd assignment
2. npm run dev

default port - localhost://3000

Backend -
-- cd backend
1.npm install

default port - localhost://5000

2. Create and run the database schema in MySQL - 

--------------------------------------------------------------------------------------------------------------------------------------------
CREATE DATABASE job_board;

USE job_board;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  department VARCHAR(100),
  location VARCHAR(100),
  description TEXT,
  posting_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  job_seeker_id INT NOT NULL,
  full_name VARCHAR(32) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  resume_path VARCHAR(255),
  cover_letter TEXT,
  status ENUM('pending','accepted','rejected','withdrawn') DEFAULT 'pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (job_seeker_id) REFERENCES job_seekers(id) ON DELETE CASCADE,
  UNIQUE KEY ux_job_seeker (job_id, job_seeker_id),
  INDEX idx_job_id (job_id),
  INDEX idx_job_seeker_id (job_seeker_id),
  INDEX idx_applied_at (applied_at)
);

CREATE TABLE job_seekers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE job_seekers 
MODIFY COLUMN name VARCHAR(32) NOT NULL;

ALTER TABLE job_seekers;

ALTER TABLE job_seekers 
ADD COLUMN applied_jobs_json JSON NULL AFTER password;

ALTER TABLE applications
ADD COLUMN email VARCHAR(100) NOT NULL AFTER phone;
ALTER TABLE applications MODIFY COLUMN job_seeker_id INT NULL;

--------------------------------------------------------------------------------------------------------------------------------------------------

3.  Configure backend/db.js with your MySQL password:-

import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // place your MySQL password here
  database: "job_board",
});

export default db;
............................................................................
4. nodemon index.js



