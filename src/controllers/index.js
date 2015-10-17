const TestService = require('src/services/test');
const testService = new TestService();
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

    testService.getAvailableTests()
      .then(function sendResult(tests) {
        console.log(tests);
        application.tests = tests;
        res.render('index.html', application);
      })
      .then(null, function evalError(error) {
        console.log(error);
      });
  });

  return ['/', router];
};
