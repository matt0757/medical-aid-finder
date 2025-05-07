const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  services: [String],
  operatingHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  acceptedInsurance: [String],
  specialties: [String],
  ratings: {
    average: Number,
    count: Number
  },
  description: String,
  images: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Create a geospatial index on the location field
facilitySchema.index({ location: '2dsphere' });

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;