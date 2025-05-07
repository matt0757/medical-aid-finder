const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users (admin only in a real app)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new user (registration)
router.post('/', async (req, res) => {
  // In a production app, you would hash passwords here
  const user = new User(req.body);

  try {
    const newUser = await user.save();
    // Don't return password in response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) user
router.put('/:id', async (req, res) => {
  try {
    // Don't allow password updates through this route
    if (req.body.password) {
      delete req.body.password;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST save a facility to user's favorites
router.post('/:userId/save-facility/:facilityId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add facility to saved list if not already saved
    if (!user.savedFacilities.includes(req.params.facilityId)) {
      user.savedFacilities.push(req.params.facilityId);
      user.updatedAt = Date.now();
      await user.save();
    }
    
    res.json({ message: 'Facility saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE remove a facility from user's favorites
router.delete('/:userId/save-facility/:facilityId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove facility from saved list
    user.savedFacilities = user.savedFacilities.filter(
      facilityId => facilityId.toString() !== req.params.facilityId
    );
    
    user.updatedAt = Date.now();
    await user.save();
    
    res.json({ message: 'Facility removed from saved list' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;