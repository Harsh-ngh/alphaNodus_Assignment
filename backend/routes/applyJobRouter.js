import express from "express";
import db from "../db.js"; 
import { upload } from "../middleware/multerConfig.js";
import { isValidName, isValidPhone, isValidEmail } from "../utils/validators.js";

const router = express.Router();


const PER_JOB_APPLICATION_LIMIT = 5;      // max candidates for a single job
const USER_JOB_LIMIT_24H = 5;             // max jobs a user can apply to in 24h (exclude rejected)
const JOB_ACTIVE_APPLICATION_LIMIT = 10;  // overall active cap

router.post(
  "/jobs/:jobId/apply",
  upload.single("resume"),
  async (req, res) => {
    const conn = await db.getConnection(); 
    try {
      await conn.beginTransaction();

      const jobId = Number(req.params.jobId);
      const fullName = (req.body.full_name || "").trim();
      const phone = (req.body.phone || "").trim();
      const coverLetter = req.body.cover_letter || null;
      const resumePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
      const applicantEmail = (req.body.email || "").trim();

     
      if (!isValidName(fullName)) {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "Full name must be 2-32 characters." });
      }
      if (!isValidPhone(phone)) {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "Phone number is invalid." });
      }
      if (!isValidEmail(applicantEmail)) {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "Email is invalid." });
      }

      
      const [jobRows] = await conn.query("SELECT id FROM jobs WHERE id = ? FOR UPDATE", [jobId]);
      if (jobRows.length === 0) {
        await conn.rollback();
        return res.status(404).json({ success: false, message: "Job not found." });
      }

     
      const [existingRows] = await conn.query(
        "SELECT id, status FROM applications WHERE job_id = ? AND full_name = ? AND phone = ?",
        [jobId, fullName, phone]
      );
      if (existingRows.length > 0 && existingRows[0].status !== "withdrawn") {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "You have already applied for this position." });
      }


      const [countPerJobRows] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM applications WHERE job_id = ? AND status IN ('pending','accepted')",
        [jobId]
      );
      const currentPerJob = Number(countPerJobRows[0].cnt || 0);
      if (currentPerJob >= PER_JOB_APPLICATION_LIMIT) {
        await conn.rollback();
        return res.status(400).json({
          success: false,
          message: `This job already has ${PER_JOB_APPLICATION_LIMIT} applicants; no more applications accepted.`,
        });
      }

  
      const [userRecentRows] = await conn.query(
        `SELECT COUNT(*) AS cnt FROM applications
         WHERE email = ? AND status != 'rejected' AND applied_at >= (NOW() - INTERVAL 24 HOUR)`,
        [applicantEmail]
      );
      const userRecent = Number(userRecentRows[0].cnt || 0);
      if (userRecent >= USER_JOB_LIMIT_24H) {
        await conn.rollback();
        return res.status(429).json({
          success: false,
          message: `You have applied to ${USER_JOB_LIMIT_24H} jobs in the last 24 hours. Try again later.`,
        });
      }

    
      const [activeCapRows] = await conn.query(
        "SELECT COUNT(*) AS cnt FROM applications WHERE job_id = ? AND status IN ('pending','accepted')",
        [jobId]
      );
      if (Number(activeCapRows[0].cnt || 0) >= JOB_ACTIVE_APPLICATION_LIMIT) {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "Job has reached the maximum number of active applications." });
      }

      await conn.query(
        `INSERT INTO applications
          (job_id, full_name, phone, resume_path, cover_letter, status, email)
         VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
        [jobId, fullName, phone, resumePath, coverLetter, applicantEmail]
      );

      await conn.commit();
      return res.json({ success: true, message: "Application submitted successfully." });
    } catch (err) {
      console.error("Apply error:", err);
      try { await conn.rollback(); } catch (_) {}
      return res.status(500).json({ success: false, message: "Server error" });
    } finally {
      conn.release();
    }
  }
);

export default router;
