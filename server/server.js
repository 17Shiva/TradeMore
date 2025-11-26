// server.js
console.log("🔥 Starting server...");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import http from "http";
import { Server as IOServer } from "socket.io";
import Redis from "ioredis";

import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import productRoutes from "./routes/product.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import sellerOrderRoutes from "./routes/sellerOrderRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("uploads"));
app.use("/api/seller", sellerOrderRoutes);

// Create HTTP server (IMPORTANT)
const server = http.createServer(app);

// Attach socket.io to HTTP server
export const io = new IOServer(server, {
  cors: { origin: "*" },
});

// Client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Buyer placed order
  socket.on("order_placed", (data) => {
    console.log("🔥 Order placed event from buyer:", data);

    const room = `seller_${data.sellerId}`;
    console.log("➡️ Sending to room:", room);

    io.to(room).emit("order:update", {
      orderId: data.orderId,
      status: data.status,
      userId: data.userId
    });
  });

  socket.on("join", (room) => {
    console.log("🟦 Seller joined:", room);
    socket.join(room);
  });
});


// ----------------------------------------------------
//                 REDIS PUB / SUB
// ----------------------------------------------------

const sub = new Redis("redis://127.0.0.1:6379");

sub.subscribe("order_updates");
sub.on("message", (channel, message) => {
  if (channel === "order_updates") {
    try {
      const update = JSON.parse(message);

      console.log("📡 Redis → Socket:", update);
      console.log("PUB MESSAGE:", update);

      // Notify buyer
      if (update.userId) {
        io.to(`user_${update.userId}`).emit("order:update", update);
      }

      // Notify seller
      if (update.sellerId) {
        io.to(`seller_${update.sellerId}`).emit("order:update", update);
      }

    } catch (err) {
      console.error("❌ Failed to parse Redis message:", err);
    }
  }
});

// ----------------------------------------------------
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/track", trackingRoutes);

app.get("/", (req, res) => res.send("API running"));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
