const express = require('express');
const router = express.Router();

const { getAllAdminUsers, getAdminUser, updateApprovalCode, updatePassword } = require('../controllers/ctrlAdmin');
const { getAllSubscribedEmails, getASubscribedEmail } = require('../controllers/ctrlSubscribers');
const { processEmails } = require('../controllers/ctrlProcessEmail');
const register = require('../controllers/ctrlRegister');
const login = require('../controllers/ctrlLogin');
const auth = require('../config/auth');


// Register for Admin page
router.post('/register', register)

// Login to Admin Page
router.post('/login', login)

// Get All Admin Users
router.get('/users', auth, getAllAdminUsers);

// Get an Admin User
router.get('/users/:userId', auth, getAdminUser);

// Update Approval Code
router.put('/users/update/approvalcode', auth, updateApprovalCode);

// Update Password
router.put('/users/update/:userId/password', auth, updatePassword);

// Get All Newsletter Subscribers
router.get('/email/:userId/subscribers', auth, getAllSubscribedEmails);

// Get a Newsletter Subscriber
router.get('/email/:userId/subscribers/:emailId', auth, getASubscribedEmail);

// Process Newsletter Email Subscriptions
router.post('/subscribe', processEmails);


module.exports = router;
