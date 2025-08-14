import express from 'express';

const router = express.Router();

// Dummy tracking info for testing
router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;

  res.json({
    orderId,
    status: "In Transit",
    estimatedDelivery: "2025-07-20",
    currentLocation: "Delhi Distribution Center",
    lastUpdated: new Date().toISOString()
  });
});

export default router;
