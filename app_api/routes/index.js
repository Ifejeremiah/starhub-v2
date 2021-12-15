const express = require('express');
const router = express.Router();

const { getAllAdminUsers, getAdminUser, updatePassword } = require('../controllers/ctrlSuperAdminOperations');
const { getAllSubscribedEmails, getASubscribedEmail } = require('../controllers/ctrlViewNewsletterSubscribers');
const { processEmails } = require('../controllers/ctrlProcessEmail');
const register = require('../controllers/ctrlRegister');
const login = require('../controllers/ctrlLogin');
const auth = require('../config/auth');


// Login to Admin Page
router.post('/login', login)

// Register for Admin page
router.post('/register', auth, register)

// Get All Admin Users
router.get('/users', auth, getAllAdminUsers);

// Get an Admin User
router.get('/users/:userId', auth, getAdminUser);

// Update Password
router.put('/users/:userId/update/password', auth, updatePassword);

// Get All Newsletter Subscribers
router.get('/email/subscribers', auth, getAllSubscribedEmails);

// Get a Newsletter Subscriber
router.get('/email/subscribers/:emailId', auth, getASubscribedEmail);

// Process Newsletter Email Subscriptions
router.post('/subscribe', processEmails);


module.exports = router;
