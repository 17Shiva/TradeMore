// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, default: 1 },
//   status: { type: String, default: 'Pending' },
//   estimatedDelivery: { type: Date, default: () => new Date(Date.now() + 7*24*60*60*1000) }, // default 7 days
//   history: [
//     {
//       status: String,
//       location: String,
//       timestamp: { type: Date, default: Date.now }
//     }
//   ]
// }, { timestamps: true });

// export default mongoose.model('Order', orderSchema);


import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: String,
  qty: { type: Number, default: 1 },
  price: Number,
  image: String,
});

const trackingSchema = new mongoose.Schema({
  status: { type: String, default: "created" }, // created, processing, shipped, out-for-delivery, delivered, cancelled
  location: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional for multi-seller
  items: [orderItemSchema],
  shippingAddress: { type: String },
  paymentMethod: String,
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "created" },
  tracking: [trackingSchema],
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

