import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";   

const router = express.Router();

// Job Seeker Signup
router.post("/signupJobSeeker", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const [existing] = await db.query(
      "SELECT * FROM job_seekers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      "INSERT INTO job_seekers (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Create JWT token
    const token = jwt.sign(
      { email, role: "job_seeker" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Signup successful",
      token,
      email,
      role: "job_seeker",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;


