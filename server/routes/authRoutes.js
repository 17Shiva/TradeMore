import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login Request:", email, password);

  try {
    const user = await User.findOne({ email });
    console.log("👤 Found User:", user);

    if (!user || user.password !== password) {
      console.log("❌ Invalid credentials for", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for", email);
    return res.json({
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("💥 Server Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
