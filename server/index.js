require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/secure');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

console.log("Connection: "+process.env.MONGODB_CONNECTION_STRING)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

