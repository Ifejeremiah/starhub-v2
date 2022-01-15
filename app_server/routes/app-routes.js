const express = require('express');
const { path } = require('path');
const router = express.Router();

// Controllers
const { homeCtrl, subscribe } = require('../controllers/ctrlHome');
const aboutCtrl = require('../controllers/ctrlAbout');
const connectCtrl = require('../controllers/ctrlConnect');
const serveAndSupportCtrl = require('../controllers/ctrlServe&Support');
const clanCtrl = require('../controllers/ctrlClan');

// Get and post to Home page. 
router.route('/').get(homeCtrl).post(subscribe);

// Get About page
router.get('/about', aboutCtrl);

// Get Connect page
router.get('/connect', connectCtrl);

// Get Serve and Support page
router.get('/serve', serveAndSupportCtrl);

// Get Clan page
router.get('/clan', clanCtrl);

module.exports = router;
