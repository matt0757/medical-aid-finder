const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// POST /api/auth/register - Register a user
router.post('/register', async (req, res) => {
  console.log('Registration attempt:', req.body);
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Check if user exists
    console.log('Checking if user exists...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    console.log('Creating new user...');
    user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Hash password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    console.log('Saving user to database...');
    const savedUser = await user.save();
    console.log('User saved successfully with ID:', savedUser._id);

    // Create JWT payload
    console.log('Creating JWT token...');
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err);
          throw err;
        }
        console.log('Registration successful, returning token');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/auth/login - Authenticate user & get token
router.post('/login', async (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid login: User not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid login: Password does not match for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User authenticated successfully:', user.email);

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err);
          throw err;
        }
        console.log('Login successful, returning token');
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/auth/me - Get current user
router.get('/me', auth, async (req, res) => {
  try {
    console.log('Getting user profile for ID:', req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('User not found with ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User profile retrieved successfully');
    res.json(user);
  } catch (err) {
    console.error('Error retrieving user profile:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;