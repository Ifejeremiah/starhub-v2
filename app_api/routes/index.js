const express = require('express');
const router = express.Router();

const { getAllSubscribedEmails, getASubscribedEmail } = require('../controllers/ctrlAdmin');
const { processEmails } = require('../controllers/ctrlSubscription');
const register = require('../controllers/ctrlRegister');
const login = require('../controllers/ctrlLogin');
const auth = require('../config/auth');

// Get All Newsletter Subscribers
router.get('/admin/subscribers', auth, getAllSubscribedEmails);

// Get a Newsletter Subscriber
router.get('/admin/subscribers/:emailId', auth, getASubscribedEmail);

// Register for Admin page
router.post('/admin/register', register)

// Login to Admin Page
router.post('/admin/login', login)

// Process Newsletter Email Subscriptions
router.post('/subscribe', processEmails);


module.exports = router;
