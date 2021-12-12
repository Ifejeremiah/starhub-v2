const User = require('mongoose').model('User');

// Get All Admin Users
const getAllAdminUsers = (req, res) => {
  User.find()
    .then(users => {
      if (!users.length) {
        return res.status(404).json({ msg: 'There are no admin Users' });
      } else {
        const admins = users.map(user => {
          return {
            _id: user.id,
            name: user.name
          }
        });
        return res.status(200).json(admins);
      }
    }).catch(err => console.log(err));
}

// Get an Admin User
const getAdminUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'Admin user not found' });
      } else {
        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          dateRegistered: user.dateRegistered
        });
      }
    }).catch(err => {
      console.log(err);
      return res.status(400).json({ error: 'Invalid Admin ID' });
    });
}

// Change On Site Approval Code 
const updateApprovalCode = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user.approvalCode) {
        return res.status(400).json({ msg: 'Sorry, you are not an On-Site Administrator' });
      } else {
        user.setApprovalCode();
        user.save((err, updateduser) => {
          if (err) console.log(err);
          else {
            return res.status(201).json(updateduser.approvalCode);
          }
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(400).json({ error: 'Invald Admin ID' });
    });
}

// Change Password
const updatePassword = (req, res) => {
  const { password, password2 } = req.body;
  if (!password) {
    return res.status(400).json({ msg: 'A password update is required' });
  } else if (password !== password2) {
    return res.status(400).json({ error: 'Update Password do not match' });
  }
  User.findById(req.params.userId)
    .then(user => {
      user.setPassword(password);
      user.save((err) => {
        if (err) console.log(err);
        else {
          return res.status(201).json({ msg: 'Password Updated' });
        }
      });
    }).catch(err => {
      console.log(err);
      res.status(404).json({ error: 'Admin User Not Found' });
    });
}

module.exports = {
  getAllAdminUsers,
  getAdminUser,
  updateApprovalCode,
  updatePassword,
}