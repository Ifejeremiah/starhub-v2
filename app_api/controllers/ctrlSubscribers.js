const User = require('mongoose').model('User');
const Email = require('mongoose').model('Email');


const verifyAdmin = (req, res, callback) => {
  const { userId } = req.params;
  if (userId.length !== 24) {
    return res.status(400).json({ error: 'invalid user id' });
  }
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'invalid user id' });
      }
      if (user.role === 110111 || user.role === 110011) {
        callback();
      } else {
        return res.status(401).json({ error: 'sorry, you can not access this resource' });
      }
    }).catch(err => console.log(err));
}

// Get All Newsletter Subscribers
const getAllSubscribedEmails = (req, res) => {
  verifyAdmin(req, res, () => {
    Email.find()
      .then((emails) => {
        if (!emails.length) {
          return res.status(404).json({ msg: 'there are no subscribed emails at the moment' });
        } else {
          const subscribedEmails = emails.map(email => { return email.email });
          return res.status(200).json(subscribedEmails);
        }
      }).catch(err => console.log(err));
  });
}

// Get a Newsletter Subscriber
const getASubscribedEmail = (req, res) => {
  Email.findOne({ email: req.params.emailId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'could not find email address' });
      } else {
        return res.status(200).json(user);
      }
    }).catch(err => console.log(err));
}


module.exports = {
  getAllSubscribedEmails,
  getASubscribedEmail,
}