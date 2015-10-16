const UserService = require('src/services/user');

module.exports = {

  /**
   * Given an object user (retreived from session object) gets the userId associated
   * @param  {Object}   user User object information
   * @param  {Function} done Completion callback
   */
  serialize: function serializeSession(user, done) {
    done(null, user._id);
  },

  /**
   * Gets the full user information based on the session id
   * @param  {String}   id   Userid
   * @param  {Function} done Completion callback
   */
  deserialize: function deserializeSession(id, done) {
    return UserService
      .getUserById(id)
      .then(function returnUser(user) {
        done(null, user);
      })
      .then(null, function returnError(error) {
        done(error, null);
      });
  }
};
