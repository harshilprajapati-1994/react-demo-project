"use strict";
const express = require('express');
const router = express.Router();
const products = require('../data/products.json');
// GET all products
router.get('/', (req, res) => {
    res.json(products);
});
// GET single product
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product)
        return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product deleted successfully' });
});
// POST - Create a new product
router.post('/', (req, res) => {
    const { title, price, image, description, category } = req.body;
    if (!title || !price || !image || !description || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = {
        id: Date.now(), // or use uuid
        title,
        price,
        image,
        description,
        category,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
module.exports = router;
