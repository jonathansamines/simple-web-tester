const Promise = require('bluebird');

const RolService = require('src/services/rol');
const UserService = require('src/services/user');
const TestService = require('src/services/test');

const rolService = new RolService();
const userService = new UserService();
const testService = new TestService();

module.exports = function seedInitialData() {
  const rolCreation = Promise.all([
    rolService.createRol({ name: 'Profesor' }),
    rolService.createRol({ name: 'Estudiante' })
  ]);

  rolCreation
    .then(function assignRoles(roles) {
      const teacherRol = roles[0];
      // const studentRol = roles[1];

      return userService.registerUser({
        username: 'teacher',
        firstName: 'Daniel',
        lastName: 'Salazar',
        email: 'daniel.salazar@miumg.edu.gt',
        carnet: '000000000000',
        password: 'umgAAr00t',
        repeat_password: 'umgAAr00t',
        rol: teacherRol._id
      });
    })
    .then(function createCalculusTest(teacher) {
      const ansQ1 = [];
      ansQ1.push({
        description: 'Mi respuesta incorrecta 1',
        isValidAnswer: false,
        help: 'Ayuda de prueba'
      });
      ansQ1.push({
        description: 'Mi respuesta incorrecta 2',
        isValidAnswer: false,
        help: 'Ayuda de prueba 2'
      });
      ansQ1.push({
        description: 'Mi respuesta correcta final',
        isValidAnswer: true,
        help: 'Ayuda de prueba 3'
      });

      const question1 = {
        title: 'Pregunta numero 1',
        description: 'A continuación se le presenta una pregunta compleja.',
        value: 10,
        answers: ansQ1
      };

      const ansQ2 = [];
      ansQ2.push({
        description: 'Mi respuesta 2 incorrecta 1',
        isValidAnswer: false,
        help: 'La ayuda divina'
      });
      ansQ2.push({
        description: 'Mi respuesta 2 correcta',
        isValidAnswer: true,
        help: 'La ayuda celestial'
      });
      ansQ2.push({
        description: 'Mi respuesta 2 incorrecta 2',
        isValidAnswer: false,
        help: null
      });

      const question2 = {
        title: 'Pregunta numero 2',
        description: 'A continuación una pregunta sencilla',
        value: 90,
        answers: ansQ2
      };

      return testService.createTest({
        title: 'Test Calculo de 3 variables',
        description: 'A continuación se le presenta una evaluación teórico práctico sobre el tema "Calculo de 3 o más variables", en el cual se evaluará su conocimiento y dominio del tema a través de una serie de preguntas (multirespuesta)',
        intentsNumber: 1,
        value: 100,
        author: teacher._id,
        questions: [question1, question2]
      });
    })
    .catch(function evalError(error) {
      console.error(error.stack);
    });
};
