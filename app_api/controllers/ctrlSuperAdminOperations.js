const User = require('mongoose').model('User');

const verifySuperAdmin = (req, res, callback) => {
  const { _id } = req.payload;
  User.findOne({ _id })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Invalid User' });
      } else if (user.role !== 110111) {
        return res.status(401).json({ error: 'sorry, you can not access this resource' });
      } else {
        callback();
      }
    }).catch(err => console.log(err));
}

const translateRoles = (role) => {
  let userType;
  if (role === 110111) {
    userType = 'super admin';
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
            email: user.email,
            role: translateRoles(user.role),
            dateRegistered: user.dateRegistered
          }
        });
        return res.status(200).json(admins);
      }).catch(err => console.log(err));
  });
}

// Get an Admin User
const getAdminUser = (req, res) => {
  verifySuperAdmin(req, res, () => {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userid is required' });
    } else if (userId.length !== 24) {
      return res.status(400).json({ error: 'invalid user id' });
    }
    User.findById(userId)
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

// Create an Admin User
const createAdminUser = (req, res) => {
  const { name, email, password, password2, userRole } = req.body;
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ error: 'please fill all fields' });
  } else if (password.length < 8) {
    return res.status(400).json({ error: 'password should be at least 8 characters' });
  } else if (password !== password2) {
    return res.status(400).json({ error: 'passwords do not match' });
  } User.find()
    .then((user) => {
      if (!user.length) {
        const user = new User({ name, email, });
        user.setPassword(password);
        user.setRole('sUpErAdmiN');
        user.save()
          .then(() => {
            const token = user.generateJwt();
            return res.status(201).json({ token });
          }).catch(err => console.log(err));
      } else {
        verifySuperAdmin(req, res, () => {
          User.findOne({ email })
            .then((user) => {
              if (user) {
                return res.status(400).json({ error: 'email is already registered, try again, with a new email' });
              } else if (!userRole) {
                return res.status(400).json({ error: 'please identify user role' });
              } else {
                const user = new User({ name, email });
                user.setPassword(password);
                user.setRole(userRole);
                user.save()
                  .then(() => {
                    const token = user.generateJwt();
                    return res.status(201).json({ token });
                  }).catch(err => console.log(err));
              }
            }).catch(err => console.log(err));
        });
      }
    }).catch(err => console.log(err));
}

// Update an Admin User
const updateAdminUser = (req, res) => {
  verifySuperAdmin(req, res, () => {
    const { userId } = req.params;
    const { name, email, password, password2, userRole } = req.body;
    if (userId.length !== 24) {
      return res.status(400).json({ error: 'invalid user id' });
    } else if (password && password.length < 8) {
      return res.status(400).json({ error: 'password should be at least 8 characters' });
    } else if (password !== password2) {
      return res.status(400).json({ error: 'passwords do not match' });
    } User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'could not find user' });
        }
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        password ? user.setPassword(password) : user.hash = user.hash;
        if (userRole && user.role === 110111) {
          return res.status(403).json({ error: 'can not update role of a super admin' });
        } else if (userRole && userRole.toLowerCase() === 'superadmin') {
          return res.status(403).json({ error: 'can not update role to super admin' });
        } else {
          userRole ? user.setRole(userRole) : user.role;
        } user.save()
          .then((updatedUser) => {
            return res.status(201).json({
              msg: `user updated to, name: ${updatedUser.name}, email: ${updatedUser.email}, password: ${password ? password : 'former password'}, userRole: ${translateRoles(updatedUser.role)}`
            });
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  });
}

const deleteAdminUser = (req, res) => {
  verifySuperAdmin(req, res, () => {
    const { userId } = req.params; let username;
    if (!userId) {
      return res.status(400).json({ error: 'userid is required' });
    } else if (userId.length !== 24) {
      return res.status(400).json({ error: 'invalid user id' });
    } User.findById(userId)
      .then(user => {
        if (!user) return res.status(404).json({ error: 'could not find user' });
        if (user.role !== 110111) {
          username = user.name;
          User.findByIdAndDelete(userId)
            .then(() => {
              return res.status(200).json({ msg: `${username}\'s account deleted` });
            }).catch(err => console.log(err));
        } else {
          return res.status(403).json({ error: 'can not delete super user account' });
        }
      }).catch(err => console.log(err));
  })
}

module.exports = {
  getAllAdminUsers,
  getAdminUser,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser
}