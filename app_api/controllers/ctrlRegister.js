const mongoose = require('mongoose');
const User = mongoose.model('User');

// Register handle
module.exports = (req, res) => {
  const { name, email, password, password2, adminApprovalCode } = req.body;

  // Check all fields
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  // Check password length
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password should be at least 8 characters' });
  }

  // Check if passwords match 
  if (password !== password2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  User.find()
    .then((user) => {
      if (!user.length) {
        const user = new User({ name, email, });
        user.setPassword(password);
        user.setApprovalCode();
        user.save(err => {
          if (err) { console.log(err) }
          else {
            const token = user.generateJwt();
            return res.status(200).json({ token, approvalCode: user.approvalCode });
          }
        });
      } else {
        User.findOne({ email })
          .then((user) => {
            if (user) {
              return res.status(400).json({ error: 'Email is already registered, try again, with a new email' });
            } else if (!adminApprovalCode) {
              return res.status(400).json({ error: 'Admin\'s approval code (name: adminApprovalCode) is required to register new admin user' });
            } else {
              User.findOne({ approvalCode: adminApprovalCode })
                .then((user) => {
                  if (!user) {
                    return res.status(404).json({ error: 'Incorrect Admin Approval Code' });
                  } else {
                    const user = new User({ name, email });
                    user.setPassword(password);
                    user.save(err => {
                      if (err) {
                        console.log(err)
                      } else {
                        const token = user.generateJwt();
                        return res.status(200).json({ token });
                      }
                    });
                  }
                }).catch(err => console.log(err));
            }
          });
      }
    });
};
