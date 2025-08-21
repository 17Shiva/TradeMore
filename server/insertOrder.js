const mongoose = require('mongoose');

// Order schema
const OrderSchema = new mongoose.Schema({
  orderId: String,
  buyerId: String,
  sellerId: String,
  productId: String,
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  }
});

// Create model
const Order = mongoose.model('Order', OrderSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TRADEMORE', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  // Insert test order
  await Order.create({
    orderId: "ORDER123",
    buyerId: "BUYER001",
    sellerId: "SELLER123",
    productId: "PROD001",
    status: "Pending"
  });

  console.log("✅ Test order inserted");
  process.exit();
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
