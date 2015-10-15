const LocalStrategy = require('passport-local').Strategy;
const UserService = require('src/services/user');

const service = new UserService();
module.exports = new LocalStrategy(function validateCredentials(username, password, done) {
  return service
    .authenticateUser({ username, password })
    .then(function sendAuthenticationResult(user) {
      return done(null, user);
    })
    .catch(done);
});
