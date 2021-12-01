// Homepage Controller
const homeCtrl = (req, res) => {
  res.render('homepage', { title: 'The StarHub - Youth Expression of Daystar Christian Center.' });
};


module.exports = {
  homeCtrl,
  
}