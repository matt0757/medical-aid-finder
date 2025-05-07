const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'provider'],
    default: 'user'
  },
  savedFacilities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;