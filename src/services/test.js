const TestModel = require('src/models/test').Model;
const TestIntentModel = require('src/models/testintent').Model;
require('src/models/answerintent');

function TestService() {}

/**
 * Get the list of available test
 * @return {Promise} Result of the get all search
 */
TestService.prototype.getAvailableTests = function getAvailableTests() {
  return TestModel.find().populate('author').exec();
};

/**
 * Get the complete information (including questions and possible answers)
 * @param  {Number} testId Test identifier
 * @return {Promise}       Search result promise
 */
TestService.prototype.getFullTest = function getFullTestObject(testId) {
  return TestModel.findById(testId).exec();
};

/**
 * Create a testintent for a given user and test
 * @param  {Number} testId Test identifier
 * @param  {Number} userId User identifier
 * @return {Promise}       Promise which contains the result of the operation
 */
TestService.prototype.createTestIntentToTest = function createTestIntent(testId, userId) {
  const model = new TestIntentModel({
    test: testId,
    user: userId,
    score: 0
  });

  return model.save();
};


/**
 * Save the last state of current test intent
 * @param  {Number} testIntentId  Test intent identifier
 * @param  {Number} questionValue Question to save inner value
 * @param  {Object} newAnswer     User issued answer
 * @return {Promise}              Promise which resolves on intent update
 */
TestService.prototype.saveTestIntentState = function saveTestIntentState(testIntentId, questionValue, newAnswer) {
  return TestIntentModel
    .findById(testIntentId)
    .populate('answers')
    .exec()
    .then(function update(intentReference) {
      intentReference.score += questionValue;
      intentReference.answers.push(newAnswer);

      return intentReference.save();
    });
};

/**
 * Create a new test, with a list of available questions
 * @param  {Object} test      Test model instance
 * @return {Promise}          Result of the creation as promise
 */
TestService.prototype.createTest = function createTest(test) {
  const model = new TestModel(test);
  return model.save();
};

module.exports = TestService;
