const nodemailer = require('nodemailer');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        msg: 'All fields are required',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        msg: 'Please provide a valid email address',
      });
    }

    // Create mail transporter using Mailtrap
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
      port: process.env.MAIL_PORT || 2525,
      secure: false, // Mailtrap does not use SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'recipient@example.com';

    const mailOptions = {
      from: {
        name,
        address: process.env.MAIL_USER,
      },
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: 'New Contact Form Submission',
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Debug mail options
    console.log('Mail options:', mailOptions);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // Return success response
    res.status(200).json({
      success: true,
      msg: 'Message sent successfully',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      msg: 'Server error while sending message',
      error: error.message,
    });
  }
};