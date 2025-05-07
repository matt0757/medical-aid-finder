const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// GET all facilities
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET facility by ID
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new facility
router.post('/', async (req, res) => {
  const facility = new Facility(req.body);

  try {
    const newFacility = await facility.save();
    res.status(201).json(newFacility);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) facility
router.put('/:id', async (req, res) => {
  try {
    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedFacility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json(updatedFacility);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE facility
router.delete('/:id', async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json({ message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET facilities near location
router.get('/near/:longitude/:latitude/:maxDistance?', async (req, res) => {
  try {
    const longitude = parseFloat(req.params.longitude);
    const latitude = parseFloat(req.params.latitude);
    const maxDistance = req.params.maxDistance ? parseInt(req.params.maxDistance) : 10000; // Default 10km
    
    const facilities = await Facility.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    });
    
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET facilities by service
router.get('/service/:serviceName', async (req, res) => {
  try {
    const facilities = await Facility.find({
      services: req.params.serviceName
    });
    
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;