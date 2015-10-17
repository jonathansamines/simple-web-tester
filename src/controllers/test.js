const protect = require('src/services/authentication/protect');
const TestService = require('src/services/test');
const testService = new TestService();

module.exports = function TestController(router) {
  router.get('/:testId', protect, function handleTestInit(req, res) {
    return testService
      .getFullTest(req.params.testId)
      .then(function responseWithTest(test) {
        req.session.currentTest = test;
        res.render('test/index.html', {
          test: test,
          validation: req.flash('validation')[0]
        });
      })
      .then(null, console.log);
  });

  router.post('/:testId', protect, function startTest(req, res) {
    // validate if the user has accepted the rules
    if (!req.body.acceptedRules) {
      req.flash('validation', 'Para iniciar la prueba, es obligatorio aceptar los términos del test.');
      return res.redirect(`/tests/${req.params.testId}`);
    }

    // start test
    req.session.lastQuestion = 0;
    res.redirect(`/tests/${req.params.testId}/questions/next`);
  });

  router.get('/:testId/questions/next', protect, function handleQuestionReqest(req, res) {
    const lastQuestion = req.session.lastQuestion;
    res.render('test/question.html', {
      question: req.session.currentTest.questions[lastQuestion],
      test: req.session.currentTest,
      questionIndex: lastQuestion
    });
  });

  router.post('/:testId/questions/next', protect, function requestNextQuestion(req, res) {
    const lastQuestion = ++req.session.lastQuestion;

    if (lastQuestion >= req.session.currentTest.questions.length) {
      return res.redirect(`/tests/${req.params.testId}/result`);
    }

    return res.redirect(`/tests/${req.params.testId}/questions/next`);
  });

  router.get('/:testId/result', protect, function handleTestResult(req, res) {
    res.render('test/result.html');
  });

  return ['/tests', router];
};
