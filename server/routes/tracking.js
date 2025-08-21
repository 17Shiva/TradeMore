import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Sample Order schema
const OrderSchema = new mongoose.Schema({
  orderId: String,
  buyerId: String,
  sellerId: String,
  productId: String,
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending"
  }
});

const Order = mongoose.model("Order", OrderSchema);

// GET status by Order ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE status by Order ID
router.put("/:orderId", async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/track/orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
