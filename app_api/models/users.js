const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: Number,
    required: true,
  },
  dateRegistered: {
    type: Date,
    'default': Date.now
  },
  salt: String,
  hash: String
});

// Set encrypted paths for passwords
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');   // Creates a random string for salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');    //Creates an encrypted hash
};

// Set Roles for Users
userSchema.methods.setRole = function (role) {
  let userType;
  if (role.toLowerCase() === 'superadmin') {
    userType = 110111;
  } else if (role.toLowerCase() === 'admin') {
    userType = 110011;
  } else {
    userType = 110001;
  }
  this.role = userType;
}

// Validate submitted password
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');   //Hash the provided password
  return this.hash === hash;
}

// Generate JSON Web Token
userSchema.methods.generateJwt = function () {
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    code: this.role,
  }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

mongoose.model('User', userSchema);
