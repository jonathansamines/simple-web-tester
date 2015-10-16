const authorizer = require('src/services/authentication');
const validationError = require('src/services/error/validator');
const UserService = require('src/services/user');
const user = new UserService();

module.exports = function SessionController(router) {
  router.post('/login', authorizer);
  router.get('/login', function handleLoginPage(req, res) {
    res.render('login.html', {
      registered: req.flash('registered'),
      loginError: req.flash('error')
    });
  });

  router.get('/logout', function handleLogout(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/register', function handleRegisterPage(req, res) {
    res.render('registro.html');
  });

  router.post('/register', function handleRegister(req, res) {
    return user.registerUser(req.body)
      .then(function registerSuccess() {
        req.flash('registered', {
          type: 'success',
          message: 'Tu usuario se ha registrado correctamente.'
        });
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
