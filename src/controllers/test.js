const protect = require('src/services/authentication/protect');
const TestService = require('src/services/test');
const testService = new TestService();

module.exports = function TestController(router) {
  router.get('/:testId', protect, function handleTestInit(req, res) {

  });

  router.get('/:testId/questions/:questionId', protect, function handleQuestionReqest(req, res) {
    res.render('test/question.html');
  });

  router.get('/:testId/result', protect, function handleTestResult(req, res) {
    res.render('test/result.html');
  });

  return ['/tests', router];
};
