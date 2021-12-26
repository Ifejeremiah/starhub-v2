const express = require('express');
const { path } = require('path');
const router = express.Router();

// Controllers
const { homeCtrl, subscribe } = require('../controllers/app-control');

// Get and post to home page. 
router
  .route('/')
  .get(homeCtrl)
  .post(subscribe);

module.exports = router;
