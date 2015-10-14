module.exports = function TestController(router) {
  router.get('/:testId', function handleTestInit(req, res) {
    res.render('test/index.html');
  });

  router.get('/:testId/questions/:questionId', function handleQuestionReqest(req, res) {
    res.render('test/question.html');
  });

  router.get('/:testId/result', function handleTestResult(req, res) {
    res.render('test/result.html');
  });

  return ['/test', router];
};
