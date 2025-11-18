import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";

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

    res.json({ orderId: order._id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// 2️⃣ BUYER GETS ORDER DETAILS
router.get("/buyer/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

// 3️⃣ SELLER GETS ALL ORDERS FOR THEIR PRODUCTS
router.get("/seller/:sellerId", async (req, res) => {
  const orders = await Order.find({ seller: req.params.sellerId });
  res.json(orders);
});

// 4️⃣ SELLER UPDATES ORDER STATUS
router.put("/update-status/:id", async (req, res) => {
  const { status, message } = req.body;

  const order = await Order.findById(req.params.id);

  order.status = status;
  order.tracking.push({ status, message });

  await order.save();

  res.json({ msg: "Status updated" });
});

export default router;
