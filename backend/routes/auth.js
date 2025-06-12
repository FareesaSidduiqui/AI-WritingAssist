const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin'); // path to your firebaseAdmin.js
const User = require('../models/user'); // MongoDB User model

// POST /api/auth/reg
router.post('/reg', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify and decode the Firebase token
    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const username = decoded.name || decoded.email.split('@')[0]; // fallback

    // Save to MongoDB
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, username });
      await user.save();
    }

    res.status(200).json({ message: 'User registered', username });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
