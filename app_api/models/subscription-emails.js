const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateSubscribed: {
    type: Date,
    'default': Date.now
  }
});

mongoose.model('Email', emailSchema);