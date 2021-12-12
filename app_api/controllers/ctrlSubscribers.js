const Email = require('mongoose').model('Email');

// Get All Newsletter Subscribers
const getAllSubscribedEmails = (req, res) => {
  Email.find()
    .then((emails) => {
      if (!emails.length) {
        return res.status(404).json({ msg: 'There are no subscribed emails at the moment' });
      } else {
        const subscribedEmails = emails.map(email => { return email.email });
        return res.status(200).json(subscribedEmails);
      }
    }).catch(err => console.log(err));
}

// Get a Newsletter Subscriber
const getASubscribedEmail = (req, res) => {
  Email.findOne({ email: req.params.emailId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Could not find email address' });
      } else {
        return res.status(200).json(user);
      }
    }).catch(err => console.log(err));
}


module.exports = {
  getAllSubscribedEmails,
  getASubscribedEmail,
}