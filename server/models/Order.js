import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  status: { type: String, default: 'Pending' },
  estimatedDelivery: { type: Date, default: () => new Date(Date.now() + 7*24*60*60*1000) }, // default 7 days
  history: [
    {
      status: String,
      location: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
