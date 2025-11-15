import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/testDB", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ message: "DB Connected!", data: rows });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});


export default router;
