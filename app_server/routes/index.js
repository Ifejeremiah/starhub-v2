const express = require('express');
const router = express.Router();

// Controllers
const { homeCtrl } = require('../controllers');

/* GET home page. */
router.get('/', homeCtrl);

module.exports = router;
