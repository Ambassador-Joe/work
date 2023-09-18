// scripts/createAdmin.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

async function createAdmin() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://localhost:3001', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the admin account already exists
    const existingAdmin = await User.findOne({ username: 'admin' });

    if (!existingAdmin) {
      // Create a new admin user
      const passwordHash = await bcrypt.hash('admin_password', 10);

      const adminUser = new User({
        username: 'mensahcamilo@live.com',
        password: passwordHash,
        role: 'admin',
      });

      // Save the admin user to the database
      await adminUser.save();

      console.log('Default admin account created.');
    } else {
      console.log('Admin account already exists.');
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

createAdmin();
