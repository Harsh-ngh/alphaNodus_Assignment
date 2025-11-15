import express from "express";
import db from "../db.js";  

const router = express.Router();


router.post("/addJob", async (req, res) => {
  const { jobTitle, department, location, description, postingDate } = req.body;

  try {
    await db.query(
      "INSERT INTO jobs (title, department, location, description, posting_date) VALUES (?, ?, ?, ?, ?)",
      [jobTitle, department, location, description, postingDate]
    );

    res.json({ message: "Job added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database error" });
  }
});



export default router;
