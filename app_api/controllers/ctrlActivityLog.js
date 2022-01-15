const User = require('mongoose').model('User');

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

const getActivityOfAllUsers = (req, res) => {
  const { _id } = req.payload;
  User.findById(_id)
    .then((user) => {
      if (user && user.role === 110111) {
        User.find()
          .then(users => {
            const activity = users.map(user => {
              return {
                accountName: user.name,
                accountRole: translateRoles(user.role),
                accountID: user._id,
                activities: user.activities
              }
            });
            return res.status(200).json(activity);
          }).catch(err => console.log(err));
      } else { return res.status(401).json({ error: 'sorry, you can not access this resource' }) }
    }).catch(err => console.log(err));
}

const getActivity = (req, res) => {
  const { _id } = req.payload;
  User.findById(_id)
    .then((user) => {
      if (user) {
        return res.status(200).json(user.activities);
      } else { return res.status(400).json({ error: 'invalid user id' }) }
    }).catch(err => console.log(err));
}

module.exports = {
  getActivityOfAllUsers,
  getActivity
}