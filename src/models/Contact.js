const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    enum: ['electrical', 'telecom', 'security', 'furniture', 'civil', 'industrial', 'multiple']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema); 