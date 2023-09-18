// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    default: 'manager',
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  phoneNumber: {
     type: String,
     required: true, 
  },
  department: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  picturePath: {
    type: String,
    default: "",
  }, 
  status: {
    type: String,
    enum: ["active", "on_leave", "suspended", "retired", "temporal"], // Add other status options as needed
    default: "active", // Set a default status (e.g., "active")
  },
},

{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
