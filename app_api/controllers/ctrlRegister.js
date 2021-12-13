const User = require('mongoose').model('User');

// Register handle
module.exports = (req, res) => {
  const { name, email, password, password2, approveCode, userRole } = req.body;

  // Check all fields
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: 'please fill all fields' });
  }

  // Check password length
  if (password.length < 8) {
    return res.status(400).json({ error: 'password should be at least 8 characters' });
  }

  // Check if passwords match 
  if (password !== password2) {
    return res.status(400).json({ error: 'passwords do not match' });
  }

  User.find()
    .then((user) => {
      if (!user.length) {
        const user = new User({ name, email, });
        user.setPassword(password);
        user.setApprovalCode();
        user.setRole('sUpErAdmiN');
        user.save(err => {
          if (err) console.log(err);
          else {
            const token = user.generateJwt();
            return res.status(201).json({ token, approvalCode: user.approveCode });
          }
        });
      } else {
        User.findOne({ email })
          .then((user) => {
            if (user) {
              return res.status(400).json({ error: 'email is already registered, try again, with a new email' });
            } else if (!userRole) {
              return res.status(400).json({ error: 'please identify user role' });
            } else if (!approveCode) {
              return res.status(401).json({ error: 'sorry, you can not access this resource' });
            } else {
              User.findOne({ approveCode })
                .then((user) => {
                  if (!user) {
                    return res.status(400).json({ error: 'incorrect approval code' });
                  } else {
                    const user = new User({ name, email });
                    user.setPassword(password);
                    user.setRole(userRole);
                    user.save(err => {
                      if (err) {
                        console.log(err)
                      } else {
                        const token = user.generateJwt();
                        return res.status(201).json({ token });
                      }
                    });
                  }
                }).catch(err => console.log(err));
            }
          });
      }
    });
};
