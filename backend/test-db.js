const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function testDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Connection string:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Check existing users
    const existingUsers = await User.find().select('-password');
    console.log(`Found ${existingUsers.length} existing users:`);
    existingUsers.forEach(user => {
      console.log(`- ${user.username} (${user.email})`);
    });

    // Try creating a test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword123', // In reality, you'd hash this
      firstName: 'Test',
      lastName: 'User',
      role: 'user'
    });

    console.log('Attempting to save test user...');
    const savedUser = await testUser.save();
    console.log('Test user saved successfully with ID:', savedUser._id);

    // Verify the user was saved
    const verifyUser = await User.findOne({ email: 'test@example.com' });
    console.log('User verification:', verifyUser ? 'Found' : 'Not found');
    if (verifyUser) {
      console.log('User details:', {
        id: verifyUser._id,
        username: verifyUser.username,
        email: verifyUser.email
      });
    }

    // Clean up - delete the test user
    console.log('Cleaning up - deleting test user...');
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test user deleted');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Database test error:', error);
  }
}

testDatabase();