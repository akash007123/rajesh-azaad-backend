const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${contactData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

const sendConfirmationEmail = async (contactData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${contactData.name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Here's a summary of your submission:</p>
        <p><strong>Service:</strong> ${contactData.service}</p>
        <p><strong>Message:</strong> ${contactData.message}</p>
        <br>
        <p>Best regards,</p>
        <p>Your Company Name</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Confirmation email sending error:', error);
    return false;
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail,
}; 