import express from "express"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import db from "../db.js"; 

const router = express.Router();

router.post("/signupJobSeeker", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [existing] = await db.query(
      "SELECT * FROM job_seekers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO job_seekers (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

      const userId = result.insertId;
      console.log("New user ID:", userId);

    const token = jwt.sign(
      {
         id: userId, 
        email,
        role: "job_seeker",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
   
    console.log("Generated JWT token for new user:", token);
    return res.json({
      message: "Signup successful",
      token,
      name,
      email,
      role: "job_seeker",
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;