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
    res.redirect('/');
  });

  return ['/', router];
};
