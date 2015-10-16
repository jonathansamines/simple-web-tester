const authorizer = require('src/services/authentication');

/**
 * Serves the application entry points
 * @param  {Object} router Express router instance
 * @return {Array}         Path/router mapping
 */
module.exports = function IndexController(router) {
  const application = {
    year: (new Date()).getFullYear()
  };

  router.get('/', authorizer, function handleIndex(req, res) {
    application.loginSuccess = req.flash('success');
    res.render('index.html', application);
  });

  router.get('/home', authorizer, function handleHome(req, res) {
    res.render('index.html', application);
  });

  return ['/', router];
};
