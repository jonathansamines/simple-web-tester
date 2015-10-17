const protect = require('src/services/authentication/protect');

/**
 * Serves the application entry points
 * @param  {Object} router Express router instance
 * @return {Array}         Path/router mapping
 */
module.exports = function IndexController(router) {
  const application = {
    year: (new Date()).getFullYear()
  };

  router.get('/', protect, function handleIndex(req, res) {
    application.loginSuccess = req.flash('success');
    res.render('index.html', application);
  });

  return ['/', router];
};
