const express = require('express');
const router = express.Router();

const { getAllAdminUsers, getAdminUser, updateApprovalCode, updatePassword } = require('../controllers/ctrlAdmin');
const { getAllSubscribedEmails, getASubscribedEmail } = require('../controllers/ctrlSubscribers');
const { processEmails } = require('../controllers/ctrlProcessEmail');
const register = require('../controllers/ctrlRegister');
const login = require('../controllers/ctrlLogin');
const auth = require('../config/auth');


// Register for Admin page
router.post('/admin/register', register)

// Login to Admin Page
router.post('/admin/login', login)

// Get All Admin Users
router.get('/admin/users', auth, getAllAdminUsers);

// Get an Admin User
router.get('/admin/users/:userId', auth, getAdminUser);

// Update Approval Code
router.put('/admin/users/:userId/update/approvalcode', auth, updateApprovalCode);

// Update Password
router.put('/admin/users/:userId/update/password', auth, updatePassword);

// Get All Newsletter Subscribers
router.get('/admin/email/subscribers', auth, getAllSubscribedEmails);

// Get a Newsletter Subscriber
router.get('/admin/email/subscribers/:emailId', auth, getASubscribedEmail);

// Process Newsletter Email Subscriptions
router.post('/subscribe', processEmails);


module.exports = router;
