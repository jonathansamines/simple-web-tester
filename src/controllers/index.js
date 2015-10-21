const TestService = require('src/services/test');
const testService = new TestService();
const protect = require('src/services/authentication/protect');
const signedrequest = require('src/services/authentication/signedrequest');

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
      .then(null, console.error);
  });

  router.get('/nosotros', function handleNosotros(req, res) {
    res.render('nosotros.html');
  });

  router.get('/foro', protect, function handleForo(req, res) {
    res.render('foro.html', signedrequest.signUser(req.user));
  });

  router.get('/teoria', function handleTeoria(req, res) {
    res.render('teoria.html');
  });

  return ['/', router];
};
