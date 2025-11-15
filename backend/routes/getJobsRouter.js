import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/jobs", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
