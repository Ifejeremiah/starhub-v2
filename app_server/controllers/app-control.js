// Handle requests to app API
const makeRequest = (action, methodType, postbody, callback, query) => {
  const apiOptions = { server: 'http://localhost:5500' };
  if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://the-starhub.herokuapp.com';
  }
  require('request')({
    url: `${apiOptions.server}/api/${action}`,
    method: methodType ? methodType : 'GET',
    json: postbody ? postbody : {},
    qs: query ? query : {}
  }, callback)
};

// Homepage Controller
const homeCtrl = (req, res) => {
  res.render('homepage', { title: 'The StarHub - The Youth Expression of Daystar Christian Center.' });
};

// Post request to subscribe email
const subscribe = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Please enter a valid email address to subscribe')
  }
  makeRequest('subscribe', 'POST', { email }, (err, { statusCode }, body) => {
    if (err) console.log(err);
    if (statusCode === 201) {
      return res.status(200).send('Thank you for registering your email')
    } else {
      return res.status(400).send('Email is already in use')
    }
  })
}

const getAdminPage = (req, res) => {
  res.render('login', { title: 'Admin | Login' });
}

const loginToAdmin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render('login', {
      title: 'Error',
      error_msg: 'Please fill all fields',
      email: email, password: password
    });
  }
  makeRequest('login', 'POST', { email, password }, (err, { statusCode }, body) => {
    if (err) console.log(err);
    if (statusCode === 200) res.render('dashboard', {token: body.token});
    else{
      return res.status(400).render('login', {
        title: 'Incorrect Credentials',
        error_msg: 'Incorrect Email or Password',
        email: email, password: password
      });
    }
  })
}

module.exports = {
  homeCtrl,
  getAdminPage,
  loginToAdmin,
  subscribe
}