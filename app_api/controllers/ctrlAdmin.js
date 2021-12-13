const User = require('mongoose').model('User');

const verifySuperAdmin = (req, res, callback) => {
  const { approveCode } = req.body;
  if (!approveCode) {
    return res.status(401).json({ error: 'sorry, you can not access this resource' });
  }
  User.findOne({ approveCode })
    .then(user => {
      if (user) {
        callback();
      } else {
        return res.status(400).json({ msg: 'incorrect approval code' });
      }
    }).catch(err => console.log(err));
}

const translateRoles = (role) => {
  let userType;
  if (role === 110111) {
    userType = 'super_admin';
  } else if (role === 110011) {
    userType = 'admin';
  } else {
    userType = 'user';
  }
  return userType;
}

// Get All Admin Users
const getAllAdminUsers = (req, res) => {
  verifySuperAdmin(req, res, () => {
    User.find()
      .then(users => {
        const admins = users.map(user => {
          return {
            _id: user.id,
            name: user.name,
            role: translateRoles(user.role),
          }
        });
        return res.status(200).json(admins);
      }).catch(err => console.log(err));
  });
}

// Get an Admin User
const getAdminUser = (req, res) => {
  verifySuperAdmin(req, res, () => {
    if (req.params.userId.length !== 24) {
      return res.status(400).json({ error: 'invalid user id' });
    }
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'admin user not found' });
        } else {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: translateRoles(user.role),
            dateRegistered: user.dateRegistered
          });
        }
      }).catch(err => console.log(err));
  });
}

// Change On Site Approval Code 
const updateApprovalCode = (req, res) => {
  const { approveCode } = req.body;
  verifySuperAdmin(req, res, () => {
    User.findOne({ approveCode })
      .then(user => {
        user.setApprovalCode();
        user.save((err, updateduser) => {
          if (err) console.log(err);
          else {
            return res.status(201).json({msg: `approval code updated to: ${updateduser.approveCode}`});
          }
        });
      }).catch(err => console.log(err));

  });
}

// Change Password
const updatePassword = (req, res) => {
  const { password, password2 } = req.body;
  if (!password) {
    return res.status(400).json({ msg: 'a password to update is required' });
  } else if (password !== password2) {
    return res.status(400).json({ error: 'passwords do not match' });
  } else if (req.params.userId.length !== 24) {
    return res.status(400).json({ error: 'invalid user id' });
  }
  verifySuperAdmin(req, res, () => {
    User.findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'could not find user' });
        }
        user.setPassword(password);
        user.save((err) => {
          if (err) console.log(err);
          else {
            return res.status(201).json({ msg: `password updated to ${password}` });
          }
        });
      }).catch(err => console.log(err));
  });
}

module.exports = {
  getAllAdminUsers,
  getAdminUser,
  updateApprovalCode,
  updatePassword,
}