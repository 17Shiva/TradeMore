import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String, // URL
  sellerId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);
