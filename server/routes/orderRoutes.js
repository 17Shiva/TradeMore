import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";

import Redis from "ioredis";
const pub = new Redis("redis://127.0.0.1:6379");
const router = express.Router();

// 1️⃣ BUYER PLACES ORDER
router.post("/place", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    const order = await Order.create({
      user: req.user.id,
      seller: product.sellerId,
      items: [
        {
          productId,
          name: product.title,
          qty: quantity,
          price: product.price,
          image: product.image
        }
      ],
      totalPrice: product.price * quantity,
      tracking: [{ status: "Order Placed", message: "Order created" }]
    });

    res.json({
      order: {
        _id: order._id,
        sellerId: order.seller,
        userId: order.user,
        status: "Order Placed"
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// 2️⃣ BUYER GETS SPECIFIC ORDER DETAILS
router.get("/buyer/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// 3️⃣ BUYER GETS ALL THEIR ORDERS (my-orders)
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// 4️⃣ SELLER GETS ALL ORDERS FOR THEIR PRODUCTS
router.get("/seller/:sellerId", async (req, res) => {
  const orders = await Order.find({ seller: req.params.sellerId });
  res.json(orders);
});

// 5️⃣ SELLER UPDATES ORDER STATUS
router.put("/update-status/:id", async (req, res) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    order.status = status;
    order.tracking.push({ status, message });
    await order.save();

    // Publish minimal payload (orderId + status + sellerId + userId)
    await pub.publish(
      "order_updates",
      JSON.stringify({
        orderId: order._id.toString(),
        status: order.status,
        sellerId: order.seller?.toString(),
        userId: order.user?.toString(),
      })
    );

    res.json({ msg: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



export default router;
