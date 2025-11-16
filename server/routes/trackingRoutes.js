import express from "express";
import Order from "../models/Order.js";
import { orderQueue } from "../queues/orderQueue.js";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * 📌 PLACE ORDER (ASYNC)
 * Old: /place
 * New: /place
 * Uses Queue → Worker → Pub/Sub → Socket.io
 */
router.post("/place", protect, asyncHandler(async (req, res) => {
  const { productId, quantity, shippingAddress } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "Missing productId or quantity" });
  }

  const orderData = {
    user: req.user._id,
    items: [
      {
        productId,
        qty: quantity,
      }
    ],
    shippingAddress: shippingAddress || "Not Provided",
    paymentMethod: "COD",
    totalPrice: 0, // Will calculate later in worker if needed
  };

  // Queue the order processing
  await orderQueue.add({ orderData });

  res.status(202).json({
    message: "Order placed successfully (processing started)",
  });
}));


/**
 * 📌 TRACK ORDER (REAL MODEL)
 * Old: history: []
 * New: tracking: []
 */
router.get("/tracking/:orderId", protect, asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId)
    .populate("items.productId", "title price image");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json({
    orderId: order._id,
    status: order.status,
    tracking: order.tracking,       // ← NEW FIELD
    items: order.items,
    createdAt: order.createdAt,
  });
}));

export default router;
