const mongoose = require('mongoose');

const adminDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'working', 'progress', 'done'],
    default: 'new'
  },
  message: {
    type: String,
    trim: true
  },
  other: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminData', adminDataSchema); 