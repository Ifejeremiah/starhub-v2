const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

require('./app_api/models/db') // Link in database

const mainRouter = require('./app_server/routes/app-routes');
const apiRouter = require('./app_api/routes/api-routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', mainRouter);
// API Route
app.use('/api', apiRouter);

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
  if (req.app.get('env')) console.log(err);
  res.status(500).sendFile('public/templates/error.html', { root: __dirname })
});

module.exports = app;
