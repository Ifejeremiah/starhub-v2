const Email = require('mongoose').model('Email');

const getAllSubscribedEmails = (req, res) => {
  Email.find()
    .then((emails) => {
      if (!emails.length) {
        return res.status(404).json({ msg: 'There are no subscribed emails at the moment' });
      } else {
        return res.status(200).json(emails);
      }
    });
}

const getASubscribedEmail = (req, res) => {
  const { emailId } = req.params;
  if (!emailId) {
    return res.status(400).json({ error: 'Subscribed email address is required' });
  }
  Email.findOne({ email: emailId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Could not find email address' });
      } else {
        return res.status(200).json(user);
      }
    });
}

module.exports = {
  getAllSubscribedEmails,
  getASubscribedEmail,
}