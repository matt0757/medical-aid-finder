// models/MedicalFacility.js

const mongoose = require('mongoose');

const MedicalFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Hospital', 'Clinic', 'Pharmacy', 'Emergency Center', 'Other']
  },
  description: {
    type: String,
    required: false
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  services: [{
    type: String
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  isOpen24Hours: {
    type: Boolean,
    default: false
  },
  acceptsInsurance: {
    type: Boolean,
    default: true
  },
  insuranceProviders: [{
    type: String
  }],
  ratings: {
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add text indexes for search functionality
MedicalFacilitySchema.index({
  name: 'text', 
  'address.city': 'text', 
  'address.state': 'text',
  'services': 'text'
});

// Update the 'updatedAt' field on save
MedicalFacilitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MedicalFacility', MedicalFacilitySchema);