const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('dotenv').config();

require('./app_api/models') // Link-in database
require('./app_api/config/passport');  // Passport configuration
const mainRouter = require('./app_server/routes/app-routes');   //Server Routes
const apiRouter = require('./app_api/routes');   //API Routes

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route to Admin Panel
app.use('/login', express.static(path.join(__dirname, 'app_public', 'second-build')));
app.use('/login', (req, res) => { res.sendFile(path.join(__dirname, 'app_public', 'second-build', 'index.html')) });

// Passport's middleware
app.use(passport.initialize());

// Allowing CORS requests for development purposes only
app.use('/api', (req, res, next) => {
  if (req.app.get('env') === 'development') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  } next();
});

// Routes
app.use('/', mainRouter);
app.use('/api', apiRouter); // API Route

// Catch UnAuthorized Errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: `${err.name} : ${err.message}` })
  } next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).render('error', {
    title: 'Page Not Found',
    status: 404,
    message: 'Sorry, we could not find this page'
  });
});

// error handler
app.use(function (err, req, res, next) {
  // Send an error log to console if in development mode
  if (req.app.get('env') === 'development') console.log(err);
  res.status(500).sendFile(path.join(__dirname, 'public', 'templates', 'error.html'));
});

module.exports = app;
