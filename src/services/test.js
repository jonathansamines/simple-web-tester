const TestModel = require('src/models/test').Model;

function TestService() {}

/**
 * Get the list of available test
 * @return {Promise} Result of the get all search
 */
TestService.prototype.getAvailableTests = function getAvailableTests() {
  return TestModel.find().exec();
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
 * Create a new test, with a list of available questions
 * @param  {Object} test      Test model instance
 * @return {Promise}          Result of the creation as promise
 */
TestService.prototype.createTest = function createTest(test) {
  const model = new TestModel(test);
  return model.save();
};

module.exports = TestService;
