const nodemailer = require('nodemailer');

// Log email configuration (without sensitive data)
console.log('Email Configuration:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  from: process.env.SMTP_FROM,
  adminEmail: process.env.ADMIN_EMAIL
});

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
    console.log('Attempting to send email to:', contactData.email);
    
    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1;">
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
          <img src="https://sosapient.in/logo/Dlogo.png" alt="Company Logo" style="max-height: 80px;">
        </div>
        
        <div style="padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${contactData.service}</p>
          </div>
          
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 20px;">
            <p style="margin: 0;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${contactData.email}" style="display: inline-block; background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reply to Customer</a>
          </div>
        </div>
        
        <div style="background-color: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <p style="margin: 5px 0;">
            <a href="https://sosapient.in/" style="color: #fff; text-decoration: none;">Website</a> | 
            <a href="tel:+919685533878" style="color: #fff; text-decoration: none;">+91 9685533878</a> | 
            <a href="mailto:hr.sosapient@gmail.com" style="color: #fff; text-decoration: none;">hr.sosapient@gmail.com</a>
          </p>
          <p style="margin: 5px 0;">123 Business Ave, Suite 100, City, State 12345</p>
        </div>
      </div>
      `
    });
    console.log('Admin notification email sent successfully');

    // CONFIRMATION EMAIL TO USER
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: contactData.email,
      subject: 'Thank you for contacting Your Company Name',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e1e1e1;">
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
          <img src="https://sosapient.in/logo/Dlogo.png" alt="Company Logo" style="max-height: 80px;">
        </div>
        
        <div style="padding: 20px;">
          <h2 style="color: #3498db;">Thank you for contacting us!</h2>
          
          <p>Dear ${contactData.name},</p>
          <p>We've received your message and our team will get back to you within 24-48 hours.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your inquiry summary:</h3>
            <p><strong>Service:</strong> ${contactData.service}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fff; padding: 10px; border-radius: 3px;">${contactData.message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <img src="https://sosapient.in/img/about.png" alt="Our Team" style="max-width: 100%; border-radius: 5px;">
          </div>
          
          <p>For urgent matters, please call us directly at <a href="tel:+919685533878" style="color: #3498db;">+91 9685533878</a>.</p>
          
          <p>Best regards,<br>
          <strong>The Your Company Name Team</strong></p>
        </div>
        
        <div style="background-color: #333; color: #fff; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 5px 0;">Connect with us:</p>
          <p style="margin: 10px 0;">
            <a href="https://www.facebook.com/profile.php?id=61553017931533" style="margin: 0 5px;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s" alt="Facebook" style="height: 20px;"></a>
            <a href="https://x.com/SoSapient_tech" style="margin: 0 5px;"><img src="https://m.media-amazon.com/images/I/31AGs2bX7mL.png" alt="Twitter" style="height: 20px;"></a>
            <a href="https://www.linkedin.com/company/100043699/admin/dashboard/" style="margin: 0 5px;"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s" alt="LinkedIn" style="height: 20px;"></a>
          </p>
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <p style="margin: 5px 0;">
            <a href="https://sosapient.in/" style="color: #fff; text-decoration: none;">Website</a> | 
            <a href="mailto:hr.sosapient@gmail.com" style="color: #fff; text-decoration: none;">Email Us</a> | 
            <a href="tel:+919685533878" style="color: #fff; text-decoration: none;">+91 9685533878</a>
          </p>
          <p style="margin: 5px 0;">59, Anand Nagar, Vasant Vihar, Ujjain MP 456010</p>
        </div>
      </div>
      `
    });
    console.log('User confirmation email sent successfully');

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = {
  sendContactEmail
}; 