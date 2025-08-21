import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userEmail: String,
  productName: String,
  status: {
    type: String,
    enum: ["Pending", "Shipped", "In Transit", "Delivered", "Cancelled"],
    default: "Pending"
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);
