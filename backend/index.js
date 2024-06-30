require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Use environment variables
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
const allowedOrigin = process.env.ALLOWED_ORIGIN;

global.foodData = require('./db')(function call(err, data, CatData) {
  if (err) {
    console.log(err);
  }
  global.foodData = data;
  global.foodCategory = CatData;
});

const app = express();

// Middleware to handle CORS
app.use(cors({ origin: allowedOrigin }));

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route handling
app.use('/api/auth', require('./Routes/Auth'));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
