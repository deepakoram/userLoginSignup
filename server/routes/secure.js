const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

router.get('/hello', authMiddleware, async (req, res) => {
    const user = await User.findById(req.userId);
    res.send({ message: `Welcome ${user.username}` });
});

module.exports = router;

