const Email = require('mongoose').model('Email');
const emailService = require('../config/email')();

// Process Newsletter Email Subscriptions
const processEmails = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'email is required for subscriptions' });
  }
  Email.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ error: 'email is already registered' });
      } else {
        // Send confirmation email to subscriber email
        emailService.send(email,
          'Subscriptions for Weekly Newsletters',
          `<h2>Yaay, you have just succesfully subscribed to get our weekly newsletters, enjoy!</h2>`
        );

        // Create a new instance of database model
        const user = new Email()
        user.email = email;
        user.save()
          .then((user) => { res.status(201).json(user) })
          .catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
}

module.exports = {
  processEmails,
}