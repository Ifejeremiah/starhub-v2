const express = require('express');
const router = express.Router();

const { getAllAdminUsers, getAdminUser, createAdminUser, updateAdminUser, deleteAdminUser } = require('../controllers/ctrlSuperAdminOperations');
const { getAllSubscribedEmails, getASubscribedEmail, deleteASubscribedEmail } = require('../controllers/ctrlViewNewsletterSubscribers');
const { processEmails } = require('../controllers/ctrlProcessEmail');
const login = require('../controllers/ctrlLogin');
const auth = require('../config/auth');


// Login to Admin Dashboard
router.post('/login', login)

// Get All Admin Users
router.get('/users', auth, getAllAdminUsers);

// Get an Admin User
router.get('/users/:userId', auth, getAdminUser);

// Create New User
router.post('/users', auth, createAdminUser);

router.route('/users/:userId')
  .put(auth, updateAdminUser)   // Update User
  .delete(auth, deleteAdminUser);   // Delete User

// Get All Newsletter Subscribers
router.get('/email/subscribers', auth, getAllSubscribedEmails);

router.route('/email/subscribers/:emailId')
  .get(auth, getASubscribedEmail) // Get a Newsletter Subscriber
  .delete(auth, deleteASubscribedEmail); // Delete a Newsletter Subscriber

// Process Newsletter Email Subscriptions
router.post('/subscribe', processEmails);

module.exports = router;
