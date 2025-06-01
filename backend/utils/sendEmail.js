// utils/sendEmail.js

const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'ChronoTx <test@resend.dev>', // You can use test@resend.dev for now
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }

    console.log('Email sent:', data);
    return { success: true, data };
  } catch (err) {
    console.error('Unexpected email error:', err);
    return { success: false, error: err.message };
  }
}

module.exports = sendEmail;
