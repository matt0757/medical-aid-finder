const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
console.log('Attempting to connect to MongoDB...');
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
  });

// Define routes
app.get('/api', (req, res) => {
  res.send('Medical Aid Finder API is running');
});

// Import route modules
const facilitiesRoutes = require('./routes/facilities');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Server error');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Don't exit the process in development, but log it clearly
  // process.exit(1); // Uncomment in production
});