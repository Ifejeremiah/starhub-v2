const express = require('express');
const router = express.Router();

// Controllers
const { homeCtrl, subscribe, getAdminPage, loginToAdmin } = require('../controllers/app-control');

// Get and post to home page. 
router
  .route('/')
  .get(homeCtrl)
  .post(subscribe);

router.route('/admin')
  .get(getAdminPage)
  .post(loginToAdmin);
module.exports = router;
