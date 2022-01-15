const User = require('mongoose').model('User');

const verifySuperAdmin = (req, res, callback) => {
  const { _id } = req.payload;
  User.findOne({ _id })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'invalid user' });
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
                  .then((user) => {
                    User.findById(req.payload._id)
                      .then((admin) => {
                        if (admin) {
                          admin.setActivity(`created account, ${user.name} (${user._id})`);
                          admin.save();
                        } else { return res.status(400).json({ error: 'invalid user id' }) }
                      }).catch(err => console.log(err));

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
    const { name, email, userRole, password, password2 } = req.body;
    const { userId } = req.params; let updateText = '';
    if (userId.length !== 24) { return res.status(400).json({ error: 'invalid user id' }) }
    else if (password && password < 8) { return res.status(400).json({ error: 'passwords should be at least 8 characters' }) }
    else if (password && password !== password2) { return res.status(400).json({ error: 'passwords do not match' }); }
    User.findById(userId).then(user => {
      const formerName = user.name;
      if (!name && !email && !userRole && !password) { updateText += 'to same details'; }
      if (name) {
        updateText += `name: from ${user.name} to ${name}; `;
        user.name = name;
      } if (email) {
        updateText += ` email: from ${user.email} to ${email};`;
        user.email = email;
      } if (password) {
        updateText += ` password: new password;`;
        user.setPassword(password);
      } if (userRole) {
        if (user.role === 110111) {
          return res.status(403).json({ error: 'can not update role of super admin' });
        } if (userRole.toLowerCase() === 'superadmin') {
          return res.status(403).json({ error: 'can not update to role of super admin' });
        } updateText += ` role: from ${translateRoles(user.role)} to ${userRole.toLowerCase()};`; user.setRole(userRole);
      }
      user.save()
        .then(() => {
          User.findById(req.payload._id).then(admin => {
            if (admin) {
              admin.setActivity(`updated account, ${formerName} (${user._id}), ${updateText}`);
              admin.save().catch(err => console.log(err));
            } else {
              return res.status(400).json({ error: 'invalid user' });
            }
          }).catch(err => console.log(err));
          return res.status(200).json({ msg: `account updated` });
        }).catch(err => {
          if (err.code === 11000) {
            return res.status(400).json({ error: 'email already in use' });
          } else console.log(err);
        });
    }).catch(err => console.log(err));
  });
}

const deleteAdminUser = (req, res) => {
  verifySuperAdmin(req, res, () => {
    const { userId } = req.params; let userID; let username;
    if (!userId) {
      return res.status(400).json({ error: 'userid is required' });
    } else if (userId.length !== 24) {
      return res.status(400).json({ error: 'invalid user id' });
    } User.findById(userId)
      .then(user => {
        if (!user) return res.status(404).json({ error: 'could not find user' });
        if (user.role !== 110111) {
          userID = user._id; username = user.name;
          User.findByIdAndDelete(userId)
            .then(() => {
              User.findById(req.payload._id)
                .then((admin) => {
                  if (admin) {
                    admin.setActivity(`deleted account, was ${username} (${userID})`);
                    admin.save();
                  } else { return res.status(400).json({ error: 'invalid user id' }) }
                }).catch(err => console.log(err));

              return res.status(200).json({ msg: `account deleted` });
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