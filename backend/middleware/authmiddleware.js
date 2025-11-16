import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure 'id' exists
    if (!payload.id) {
      return res.status(401).json({ success: false, message: "Authentication failed: Invalid Job Seeker ID." });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
      role: payload.role || "job_seeker",
    };

    console.log("Authenticated user:", req.user);

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
