//JWT for routes authentication

module.exports = require('express-jwt')({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'payload'
});