const validationError = require('src/services/error/validator');
const UserService = require('src/services/user');
const user = new UserService();

module.exports = function SessionController(router) {
  router.get('/login', function handleLoginPage(req, res) {
    res.render('login.html');
  });

  router.post('/login', function handleLogin(req, res) {
    res.redirect('/');
  });

  router.get('/logout', function handleLogout(req, res) {
    res.redirect('/');
  });

  router.get('/register', function handleRegisterPage(req, res) {
    res.render('registro.html');
  });

  router.post('/register', function handleRegister(req, res) {
    return user.registerUser(req.body)
      .then(function registerSuccess() {
        res.redirect('/home');
      })
      .then(null, function handleError(error) {
        const context = validationError(error, 'Información incompleta o con errores. Por favor verificar.');
        context.model = req.body;

        res.render('registro.html', context);
      });
  });

  return ['/', router];
};
