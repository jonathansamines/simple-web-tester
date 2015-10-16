const LocalStrategy = require('passport-local').Strategy;
const UserService = require('src/services/user');
const service = new UserService();

function validateCredentials(username, password, done) {
  return service
    .authenticateUser({
      username: username,
      password: password
    })
    .then(function sendAuthenticationResult(user) {
      if (user === null) return done(null, false);
      return done(null, user);
    })
    .then(null, done);
}

module.exports = new LocalStrategy(validateCredentials);
