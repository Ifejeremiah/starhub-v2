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
      return res.status(201).send('Thank you for registering your email')
    } else {
      return res.status(400).send('Email is already in use')
    }
  })
}

module.exports = {
  homeCtrl,
  subscribe
}