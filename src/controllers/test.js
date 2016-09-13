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
          validation: req.flash('validation')
        });
      });
  });

  router.post('/:testId', protect, function startTest(req, res) {
    // validate if the user has accepted the rules
    if (!req.body.acceptedRules) {
      req.flash('validation', 'Para iniciar la prueba, es obligatorio aceptar los términos del test.');
      return res.redirect(`/tests/${req.params.testId}`);
    }

    // create test intent
    return testService
      .createTestIntentToTest(req.session.currentTest._id, req.user._id)
      .then(function redirectToFirstQuestion(testIntent) {
        req.session.currentTestIntent = testIntent;

        // start test
        req.session.lastQuestion = 0;
        res.redirect(`/tests/${req.params.testId}/questions/next`);
      });
  });

  router.get('/:testId/questions/next', protect, function handleQuestionReqest(req, res) {
    const lastQuestion = req.session.lastQuestion;
    res.render('test/question.html', {
      validation: req.flash('validation-message'),
      question: req.session.currentTest.questions[lastQuestion],
      test: req.session.currentTest,
      questionIndex: lastQuestion
    });
  });

  router.post('/:testId/questions/next', protect, function requestNextQuestion(req, res) {
    // go to the next question
    const lastQuestion = ++req.session.lastQuestion;
    const currentTest = req.session.currentTest;
    const testId = req.params.testId;

    if (lastQuestion >= currentTest.questions.length) {
      return res.redirect(`/tests/${testId}/result`);
    }

    // test if there is a selected answer
    const selectedAnswer = req.body.selectedAnswer;
    if (selectedAnswer === undefined) {
      --req.session.lastQuestion;
      req.flash('validation-message', 'Seleccione una respuesta válida.');
      return res.redirect(`/tests/${testId}/questions/next`);
    }

    // create answerIntent
    const testIntent = req.session.currentTestIntent;
    const currentQuestion = currentTest.questions[lastQuestion - 1];
    const originalAnswer = currentQuestion.answers.filter( answ => answ._id === selectedAnswer )[0];
    const isCorrectAnswer = originalAnswer === undefined ? false : originalAnswer.isCorrect;

    return testService
    .saveTestIntentState(testIntent._id, currentQuestion.value, {
      originalAnswer: selectedAnswer,
      isCorrect: isCorrectAnswer
    })
    .then(function nextQuestionOnSaveIntent(updatedIntent) {
      req.session.currentTestIntent = updatedIntent;
      return res.redirect(`/tests/${testId}/questions/next`);
    });
  });

  router.get('/:testId/result', protect, function handleTestResult(req, res) {
    const testIntent = req.session.currentTestIntent;

    res.render('test/result.html', {
      testResult: testIntent,
      correctAnswers: testIntent.answers.filter( answ => answ.isCorrect),
      wrongAnswers: testIntent.answers.filter( answ => !answ.isCorrect)
    });
  });

  return ['/tests', router];
};
