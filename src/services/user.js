const UserModel = require('src/models/user');

function UserService() {}

/**
 * Authenticates an user against the user registry
 * @param  {Object} user Basic user object, which contains credentials information
 * @return {Promise}     Promise as result of the comparison
 */
UserService.prototype.authenticateUser = function authenticateUser(user) {
  const model = new UserModel(user);

  return model
    .findOne(user.userId)
    .then(function validatePassword(userObject) {
      return userObject.authenticate(user.password);
    })
    .then(function validatePasswordMatch(passwordMatch) {
      if (passwordMatch) return model;

      throw new Error('The user or password is incorrect.');
    });
};

/**
 * Register an user into the evaluation system
 * @param  {Object} user User object retreived from the view
 * @return {Promise}     Promise as result of saving operation
 */
UserService.prototype.registerUser = function registerUser(user) {
  const model = new UserModel(user);

  return model.save();
};

module.exports = UserService;
