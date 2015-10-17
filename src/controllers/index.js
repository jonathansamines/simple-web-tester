const TestService = require('src/services/test');
const testService = new TestService();
const protect = require('src/services/authentication/protect');

/**
 * Serves the application entry points
 * @param  {Object} router Express router instance
 * @return {Array}         Path/router mapping
 */
module.exports = function IndexController(router) {
  router.get('/', protect, function handleIndex(req, res) {
    return testService
      .getAvailableTests()
      .then(function sendResult(tests) {
        res.render('index.html', {
          loginSuccess: req.flash('success'),
          tests: tests
        });
      })
      .then(null, function evalError(error) {
        console.log(error);
      });
  });

  return ['/', router];
};
