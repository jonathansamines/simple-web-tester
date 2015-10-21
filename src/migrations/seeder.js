const Promise = require('bluebird');

const RolService = require('src/services/rol');
const UserService = require('src/services/user');
const TestService = require('src/services/test');

const rolService = new RolService();
const userService = new UserService();
const testService = new TestService();

const rolesData = require('./seeds/roles.json');
const usersData = require('./seeds/users.json');
const testData = require('./seeds/test.json');
const questionsData = require('./seeds/questions.json');

module.exports = function seedInitialData() {
  return Promise.all(rolesData
    .map(rolService.createRol.bind(rolService)))
    .then(function assignRoles(roles) {
      const teacherRol = roles[0];
      const teacher = usersData[0];
      teacher.rol = teacherRol._id;

      return userService.registerUser(teacher);
    })
    .then(function createCalculusTest(teacher) {
      const testCalculo = testData;
      testCalculo.author = teacher._id;
      testCalculo.questions = questionsData;

      return testService.createTest(testCalculo);
    })
    .catch(function evalError(error) {
      console.error(error.stack);
    });
};
