// Login Handle
const passport = require('passport');

module.exports = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: 'please fill all fields' });
  }
  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      console.log(err);
    } if (user) {
      token = user.generateJwt();
      return res.status(200).json({ token });
    } else {
      // send Forbidden (403)
      return res.status(403).json(info);
    }
  })(req, res);
};