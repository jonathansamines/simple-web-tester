const TestService = require('src/services/test');
const testService = new TestService();

module.exports = function TestController(router) {
  router.get('/:testId', function handleTestInit(req, res) {
    testService.getAvailableTests()
      .then(function sendResult(tests) {
        console.log(tests);
        res.render('test/index.html', {
          tests: tests
        });
      });
  });

  router.get('/:testId/questions/:questionId', function handleQuestionReqest(req, res) {
    res.render('test/question.html');
  });

  router.get('/:testId/result', function handleTestResult(req, res) {
    res.render('test/result.html');
  });

  return ['/test', router];
};
