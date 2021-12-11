// Login Handle
const passport = require('passport');

module.exports = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill all fields today' });
  }
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      console.log(err);
    } if (user) {
      token = user.generateJwt();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json(info);
    }
  })(req, res);
};