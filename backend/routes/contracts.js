const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const { saveContract } = require('../controllers/contractController');

router.post('/saveContract', saveContract);

module.exports = router;

// Test route to verify email sending
router.post('/testEmail', async (req, res) => {
  const { to } = req.body;

  const result = await sendEmail(
    to,
    'ChronoTx Test Email',
    '<h1>Hello from ChronoTx 🚀</h1><p>This is a test email.</p>'
  );

  if (result.success) {
    res.status(200).json({ message: 'Email sent', data: result.data });
  } else {
    res.status(500).json({ message: 'Email failed', error: result.error });
  }
});
