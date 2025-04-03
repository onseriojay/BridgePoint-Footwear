const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add new product (Admin-only route)
router.post('/add', async (req, res) => {
  const { name, description, price, imageUrl, stock } = req.body;

  const product = new Product({ name, description, price, imageUrl, stock });
  await product.save();

  res.status(201).json({ message: 'Product added successfully' });
});

module.exports = router;
