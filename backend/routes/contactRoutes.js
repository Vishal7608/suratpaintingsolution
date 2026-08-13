const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const router = express.Router();

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[6-9]\d{9}$/).withMessage('Phone should be a valid Indian number'),
  body('area').trim().notEmpty().withMessage('Area is required'),
  body('service').trim().notEmpty().withMessage('Service is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }

  if (req.body.honeypot) {
    return res.status(400).json({ success: false, message: 'Spam detected' });
  }

  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Contact saved', data: contact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
