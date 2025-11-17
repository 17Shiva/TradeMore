import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// 📌 Get all orders for a seller
router.get("/:sellerId/orders", async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.params.sellerId })
      .populate("user", "name email")
      .populate("items.productId", "title image price");

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch seller orders" });
  }
});

export default router;
