import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ahansharmainfosys:akash123456akash@restorent.rhvveje.mongodb.net/?retryWrites=true&w=majority&appName=restorent')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Model
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'in-progress', 'resolved'], default: 'new' },
  rowColor: { type: String, enum: ['red', 'blue', 'green', 'none'], default: 'none' },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });

    await newContact.save();

    // Send thank you email
    const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: `Thank you for contacting us about ${service}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <!-- Header with Logo -->
      <div style="background-color: #1a73e8; padding: 20px; text-align: center;">
        <img src="https://example.com/logo.png" alt="Company Logo" style="max-height: 60px;">
        <h1 style="color: white; margin: 10px 0 0 0;">Thank You, ${name}!</h1>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 25px;">
        <p style="font-size: 16px; line-height: 1.6;">We've received your message regarding <strong>${service}</strong> and our team will get back to you within 24-48 hours.</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1a73e8;">Your Message Summary:</h3>
          <p style="font-style: italic;">"${message}"</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">In the meantime, you might find these resources helpful:</p>
        
        <div style="display: flex; gap: 15px; margin: 20px 0;">
          <div style="flex: 1; text-align: center;">
            <img src="https://example.com/resource1.jpg" alt="Resource 1" style="width: 100%; max-width: 120px; border-radius: 5px;">
            <p><a href="#" style="color: #1a73e8;">${service} Guide</a></p>
          </div>
          <div style="flex: 1; text-align: center;">
            <img src="https://example.com/resource2.jpg" alt="Resource 2" style="width: 100%; max-width: 120px; border-radius: 5px;">
            <p><a href="#" style="color: #1a73e8;">FAQ</a></p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f1f3f4; padding: 15px; text-align: center; font-size: 14px;">
        <p style="margin: 0;">Need immediate assistance? Call us at <a href="tel:+1234567890" style="color: #1a73e8;">(123) 456-7890</a></p>
        <p style="margin: 10px 0 0 0;">
          <a href="https://example.com" style="color: #1a73e8; margin: 0 10px;">Website</a>
          <a href="https://facebook.com/example" style="color: #1a73e8; margin: 0 10px;">Facebook</a>
          <a href="https://twitter.com/example" style="color: #1a73e8; margin: 0 10px;">Twitter</a>
        </p>
        <p style="margin: 15px 0 0 0; color: #70757a;">© 2023 Our Company. All rights reserved.</p>
      </div>
    </div>
  `
};

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ success: false, message: 'Error submitting contact' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Error updating contact' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});