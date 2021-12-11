const Email = require('mongoose').model('Email');

const processEmails = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required for subscriptions' });
  }
  Email.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: 'Email is already registered' });
      } else {
        // Create a new instance of database model
        const user = new Email()
        user.email = email;
        user.save()
          .then((user) => { res.status(201).json(user) })
          .catch(err => console.log(err));
      }
    });
}

module.exports = {
  processEmails,
}