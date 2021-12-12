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
  approvalCode: String,
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

// Set encrypted paths for approval code
userSchema.methods.setApprovalCode = function () {
  this.approvalCode = crypto.randomBytes(24).toString('hex');   // Creates a random string for approval code
};

// Validate submitted password
userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');   //Hash the provided password
  return this.hash === hash;
}

// Generate JSON Web Token
userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);
