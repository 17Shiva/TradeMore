// // // server.js
// // console.log("🔥 Starting server...");

// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";
// // import connectDB from "./config/db.js";

// // import orderRoutes from "./routes/orderRoutes.js";
// // import authRoutes from "./routes/authRoutes.js";
// // import todoRoutes from "./routes/todoRoutes.js";
// // import productRoutes from "./routes/product.js";
// // import trackingRoutes from "./routes/trackingRoutes.js";

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // ✅ Routes
// // app.use("/api/orders", orderRoutes);
// // app.use("/api/auth", authRoutes);
// // app.use("/api/todos", todoRoutes);
// // app.use("/api/products", productRoutes);
// // app.use("/api/track", trackingRoutes);

// // // ✅ Homepage
// // app.get("/", (req, res) => {
// //   res.send("✅ Backend API is running");
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// // });




// // server.js
// console.log("🔥 Starting server...");

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import http from "http";
// import { Server as IOServer } from "socket.io";
// import Redis from "ioredis";

// import orderRoutes from "./routes/orderRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import todoRoutes from "./routes/todoRoutes.js";
// import productRoutes from "./routes/product.js";
// import trackingRoutes from "./routes/trackingRoutes.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Wrap with HTTP server so Socket.io can attach
// const server = http.createServer(app);

// // ------------------------------
// // 🔥 Socket.io Setup
// // ------------------------------
// export const io = new IOServer(server, {
//   cors: {
//     origin: "*",
//   },
// });

// // When frontend connects
// io.on("connection", (socket) => {
//   console.log("🟢 Client connected:", socket.id);

//   // Frontend will join a room like user_64cf8a3e935...
//   socket.on("join", (room) => {
//     console.log("📌 Client joined room:", room);
//     socket.join(room);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Client disconnected");
//   });
// });

// // ------------------------------
// // 🔥 Redis Subscriber (Pub/Sub)
// // ------------------------------
// const sub = new Redis(process.env.REDIS_URL || "redis://127.0.0.1:6379");

// sub.subscribe("order_updates", () => {
//   console.log("📡 Subscribed to Redis channel: order_updates");
// });

// sub.on("message", (channel, msg) => {
//   if (channel === "order_updates") {
//     const data = JSON.parse(msg);
//     console.log("📨 Redis → Server:", data);

//     // Emit update to user room
//     const userRoom = `user_${data.userId}`;
//     io.to(userRoom).emit("order:update", data);
//   }
// });

// // ------------------------------
// // 🔥 EXPRESS ROUTES
// // ------------------------------
// app.use("/api/orders", orderRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/todos", todoRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/track", trackingRoutes);

// // Homepage
// app.get("/", (req, res) => {
//   res.send("✅ Backend API is running");
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });



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
  console.log("🟢 Client connected:", socket.id);

  // Join user room
  socket.on("join", (room) => {
    console.log("📌 Client joined:", room);
    socket.join(room);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// ---------------------
// Redis Pub/Sub
// ---------------------
const sub = new Redis("redis://127.0.0.1:6379");

sub.subscribe("order_updates");
sub.on("message", (channel, message) => {
  if (channel === "order_updates") {
    const update = JSON.parse(message);
    const room = `user_${update.userId}`;

    console.log("📡 Redis → Socket:", update);
    io.to(room).emit("order:update", update);
  }
});

// ---------------------
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/products", productRoutes);
app.use("/api/track", trackingRoutes);

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
