const User = require('mongoose').model('User');
const Email = require('mongoose').model('Email');

const verifyAdmin = (req, res, callback) => {
  const { _id } = req.payload;
  User.findOne({ _id })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid User' });
      } else if (user.role === 110001) {
        return res.status(401).json({ error: 'sorry, you can not access this resource' });
      } else {
        callback();
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
          return res.status(200).json(emails);
        }
      }).catch(err => console.log(err));
  });
}

// Get a Newsletter Subscriber
const getASubscribedEmail = (req, res) => {
  verifyAdmin(req, res, () => {
    Email.findOne({ email: req.params.emailId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'could not find email address' });
        } else {
          return res.status(200).json(user);
        }
      }).catch(err => console.log(err));
  });
}

const deleteASubscribedEmail = (req, res) => {
  verifyAdmin(req, res, () => {
    const { emailId } = req.params;
    if (!emailId) {
      return res.status(400).json({ error: 'email is required' });
    } Email.findOne({ email: emailId })
      .then(user => {
        let subscribedEmail = user.email;
        if (user) {
          Email.findByIdAndDelete(user._id)
            .then(() => {
              User.findById(req.payload._id)
                .then((user) => {
                  user.setActivity(`deleted newsletter subscriber, ${subscribedEmail}`);
                  user.save();
                }).catch(err => console.log(err));

              return res.status(200).json({ msg: 'subscribed email deleted' });
            }).catch(err => console.log(err));
        } else {
          return res.status(404).json({ error: 'could not find subscriber email' });
        }
      }).catch(err => console.log(err));
  })
}

module.exports = {
  getAllSubscribedEmails,
  getASubscribedEmail,
  deleteASubscribedEmail
}