// emailService.js

const nodemailer = require('nodemailer');

// Function to send email confirmation
const sendEmailConfirmation = (email, token) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Email Confirmation',
    text: `Please click on the following link to confirm your email: http://localhost:3000/confirm-email/${token}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendEmailConfirmation,
};