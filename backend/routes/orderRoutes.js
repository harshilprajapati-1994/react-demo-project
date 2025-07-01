"use strict";
const express = require('express');
const router = express.Router();
let orders = [];
router.post('/', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).json({ message: 'Order placed successfully' });
});
router.get('/:email', (req, res) => {
    const email = req.params.email;
    const userOrders = orders.filter(order => order.email === email);
    res.json(userOrders);
});
module.exports = router;
