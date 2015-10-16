const LocalStrategy = require('passport-local').Strategy;
const UserService = require('src/services/user');
const service = new UserService();

function validateCredentials(username, password, done) {
  return service
    .authenticateUser({ username, password })
    .then(function sendAuthenticationResult(user) {
      return done(null, user);
    })
    .catch(done);
}

module.exports = new LocalStrategy(validateCredentials);
