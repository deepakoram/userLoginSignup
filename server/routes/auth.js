const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).send({ message: 'User created' });
    } catch (err) {
        res.status(400).send({ error: 'User already exists' });
    }
});

router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
        res.send({ token });
    } catch (err) {
        res.status(500).send({ error: 'Internal error, please try again' });
    }
});

module.exports = router;

