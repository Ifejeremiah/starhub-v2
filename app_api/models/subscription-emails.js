const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    'default': Date.now
  }
});

mongoose.model('Email', emailSchema);