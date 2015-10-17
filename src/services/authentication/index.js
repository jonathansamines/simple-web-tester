const passport = require('passport');

module.exports = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Usuario o contraseña incorrecta',
  successFlash: 'Bienvenido al sistema de tests'
});
