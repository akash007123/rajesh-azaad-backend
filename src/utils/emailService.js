const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendContactEmail = async (contactData) => {
  try {
    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${contactData.service}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: contactData.email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${contactData.name},</p>
        <p>We have received your message and will get back to you shortly.</p>
        <p>Here's a summary of your submission:</p>
        <ul>
          <li><strong>Service:</strong> ${contactData.service}</li>
          <li><strong>Message:</strong> ${contactData.message}</li>
        </ul>
        <p>If you have any urgent queries, please call us at +1 (234) 567-8900.</p>
        <p>Best regards,<br>Your Company Name</p>
      `
    });

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = {
  sendContactEmail
}; 