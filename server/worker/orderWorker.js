import 'dotenv/config';
import orderQueue from "../queues/orderQueue.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Redis from "ioredis";

console.log("🟢 Worker Started...");

// Redis Publisher
const pub = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

// Process jobs
orderQueue.process(async (job) => {
  console.log("📦 Processing Order Job:", job.id);
  const { orderData } = job.data;

  // 1. Create order
  const order = await Order.create(orderData);

  // 2. Update inventory
  for (const item of order.items) {
    const prod = await Product.findById(item.productId);
    if (prod) {
      prod.countInStock = Math.max(0, (prod.countInStock || 0) - item.qty);
      await prod.save();
    }
  }

  // 3. Update tracking
  order.status = "processing";
  order.tracking.push({
    status: "processing",
    message: "Order is being processed"
  });
  await order.save();

  // 4. Publish to Redis
  const updatePayload = {
    orderId: order._id,
    userId: order.user.toString(),
    status: order.status,
    tracking: order.tracking,
  };

  await pub.publish("order_updates", JSON.stringify(updatePayload));

  console.log("📡 Sent Redis Update:", updatePayload);

  return order._id;
});

// Log when queue processes jobs successfully
orderQueue.on("completed", (job) => {
  console.log(`✅ Job Completed: ${job.id}`);
});
