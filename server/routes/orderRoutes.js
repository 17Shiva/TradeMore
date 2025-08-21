import express from 'express';
import Order from '../models/Order.js';
const router = express.Router();

// Place new order
router.post('/place', async (req, res) => {
  try {
    const { buyerId, productId, quantity } = req.body;

    const order = new Order({
      buyerId,
      productId,
      quantity,
      history: [
        { status: 'Order Placed', location: 'Seller Warehouse' }
      ]
    });

    await order.save();
    res.json({ success: true, message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Tracking info
router.get('/tracking/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('productId', 'title');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({
      status: order.status,
      estimatedDelivery: order.estimatedDelivery,
      history: order.history
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
