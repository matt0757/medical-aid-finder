// routes/medicalAidRoutes.js

const express = require('express');
const router = express.Router();
const MedicalFacility = require('../models/MedicalFacility');
const { authenticateToken } = require('../middleware/auth');

/**
 * @route   GET /api/medical-aid
 * @desc    Get all medical facilities with optional filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const {
      type,
      city,
      state,
      services,
      isOpen24Hours,
      acceptsInsurance,
      insuranceProvider,
      search,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (type) filter.type = type;
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (state) filter['address.state'] = new RegExp(state, 'i');
    if (services) filter.services = { $in: services.split(',') };
    if (isOpen24Hours) filter.isOpen24Hours = isOpen24Hours === 'true';
    if (acceptsInsurance) filter.acceptsInsurance = acceptsInsurance === 'true';
    if (insuranceProvider) filter.insuranceProviders = { $in: [insuranceProvider] };
    
    // Text search if provided
    if (search) {
      filter.$text = { $search: search };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query
    const facilities = await MedicalFacility.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ 'ratings.averageRating': -1 });
    
    // Get total count for pagination
    const total = await MedicalFacility.countDocuments(filter);
    
    res.json({
      facilities,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/medical-aid/:id
 * @desc    Get medical facility by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const facility = await MedicalFacility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json(facility);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/medical-aid
 * @desc    Create a new medical facility
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const newFacility = new MedicalFacility(req.body);
    const facility = await newFacility.save();
    
    res.status(201).json(facility);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/medical-aid/:id
 * @desc    Update a medical facility
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const facility = await MedicalFacility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json(facility);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Facility not found' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/medical-aid/:id
 * @desc    Delete a medical facility
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const facility = await MedicalFacility.findByIdAndDelete(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json({ message: 'Facility removed' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/medical-aid/nearby
 * @desc    Find facilities near a location
 * @access  Public
 */
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query; // radius in km
    
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    // Find facilities within the specified radius using MongoDB's geospatial queries
    const facilities = await MedicalFacility.find({
      coordinates: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius) * 1000 // Convert km to meters
        }
      }
    }).limit(20);
    
    res.json(facilities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;