import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// any authenticated user
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

// only admin endpoint
router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({ secret: "admin data" });
});

export default router;
