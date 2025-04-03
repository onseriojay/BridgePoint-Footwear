const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/place', async (req, res) => {
  const { userId, products } = req.body;

  let totalAmount = 0;
  for (let item of products) {
    const product = await Product.findById(item.product);
    totalAmount += product.price * item.quantity;
  }

  const order = new Order({ user: userId, products, totalAmount });
  await order.save();

  res.status(201).json({ message: 'Order placed successfully', order });
});

// Get user orders
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId }).populate('products.product');
  res.json(orders);
});

module.exports = router;
