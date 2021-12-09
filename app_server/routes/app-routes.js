const express = require('express');
const router = express.Router();

// Controllers
const { homeCtrl, subscribe } = require('../controllers/app-control');

/* GET home page. */
router
  .route('/')
  .get(homeCtrl)
  .post(subscribe);

module.exports = router;
