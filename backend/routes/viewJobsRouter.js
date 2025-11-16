
import express from "express";
import db from "../db.js"; 

const router = express.Router();


router.get("/applications", async (req, res) => {
  const conn = await db.getConnection();
  try {

    const [rows] = await conn.query(`
      SELECT a.id AS application_id,
             a.full_name,
             a.phone,
             a.email,
             a.cover_letter,
             a.resume_path,
             a.status,
             a.applied_at,
             j.id AS job_id,
             j.title AS job_title,
             j.department AS job_department,
             j.location AS job_location
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      ORDER BY a.applied_at DESC
    `);

    return res.json({ success: true, applications: rows });
  } catch (err) {
    console.error("Error fetching applications:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  } finally {
    conn.release();
  }
});

export default router;
