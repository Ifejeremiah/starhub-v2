const express = require('express');
const router = express.Router();

const { processEmails } = require('../controllers/api-contol');

router.post('/subscribe', processEmails);

module.exports = router;
