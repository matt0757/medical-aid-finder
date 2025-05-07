const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Facility = require('./models/Facility');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

// Sample facility data
const facilities = [
  {
    name: 'City General Hospital',
    address: {
      street: '123 Health Ave',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    location: {
      type: 'Point',
      coordinates: [-74.0060, 40.7128] // NYC coordinates
    },
    contactInfo: {
      phone: '212-555-1000',
      email: 'info@citygeneral.example.com',
      website: 'https://citygeneral.example.com'
    },
    services: ['Emergency Care', 'Surgery', 'Pediatrics', 'Cardiology'],
    operatingHours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    acceptedInsurance: ['Medicare', 'Blue Cross', 'Aetna', 'Cigna'],
    specialties: ['Trauma Care', 'Cardiac Surgery'],
    ratings: {
      average: 4.2,
      count: 235
    },
    description: 'A leading healthcare facility providing comprehensive medical services.',
    isVerified: true
  },
  {
    name: 'Westside Medical Clinic',
    address: {
      street: '456 Wellness Blvd',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    },
    location: {
      type: 'Point',
      coordinates: [-74.0099, 40.7200] // Near NYC
    },
    contactInfo: {
      phone: '212-555-2000',
      email: 'appointments@westside.example.com',
      website: 'https://westside.example.com'
    },
    services: ['Primary Care', 'Vaccinations', 'Lab Services', 'Women\'s Health'],
    operatingHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 5:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    acceptedInsurance: ['Medicare', 'Blue Cross', 'United Health'],
    specialties: ['Family Medicine', 'Preventive Care'],
    ratings: {
      average: 4.7,
      count: 143
    },
    description: 'Friendly neighborhood clinic offering quality healthcare for the whole family.',
    isVerified: true
  },
  {
    name: 'Eastside Urgent Care',
    address: {
      street: '789 Emergency Lane',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10003',
      country: 'USA'
    },
    location: {
      type: 'Point',
      coordinates: [-73.9800, 40.7500] // East NYC
    },
    contactInfo: {
      phone: '212-555-3000',
      email: 'care@eastsideurgent.example.com',
      website: 'https://eastsideurgent.example.com'
    },
    services: ['Urgent Care', 'X-Rays', 'Minor Injuries', 'Illness Treatment'],
    operatingHours: {
      monday: '7:00 AM - 11:00 PM',
      tuesday: '7:00 AM - 11:00 PM',
      wednesday: '7:00 AM - 11:00 PM',
      thursday: '7:00 AM - 11:00 PM',
      friday: '7:00 AM - 11:00 PM',
      saturday: '8:00 AM - 10:00 PM',
      sunday: '8:00 AM - 10:00 PM'
    },
    acceptedInsurance: ['Medicare', 'Blue Cross', 'Aetna', 'United Health'],
    specialties: ['Urgent Care', 'Minor Trauma'],
    ratings: {
      average: 4.0,
      count: 98
    },
    description: 'Fast, convenient care when you need it most, no appointment necessary.',
    isVerified: true
  }
];

// Sample user data
const users = [
  {
    username: 'admin_user',
    email: 'admin@example.com',
    password: 'password123', // Will be hashed
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  },
  {
    username: 'regular_user',
    email: 'user@example.com',
    password: 'password123', // Will be hashed
    firstName: 'Regular',
    lastName: 'User',
    role: 'user'
  },
  {
    username: 'provider_user',
    email: 'provider@example.com',
    password: 'password123', // Will be hashed
    firstName: 'Provider',
    lastName: 'User',
    role: 'provider'
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Facility.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed facilities
    await Facility.insertMany(facilities);
    console.log('Seeded facilities');

    // Hash passwords and seed users
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    await User.insertMany(users);
    console.log('Seeded users');

    console.log('Database seeding completed successfully');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase();