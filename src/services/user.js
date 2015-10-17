const UserModel = require('src/models/user').Model;

function UserService() {}

/**
 * Get a given user full model given a userId
 * @param  {Number} id UserId
 * @return {Promise}   Promise which will be resolved when the user has retrieved
 */
UserService.prototype.getUserById = function getUserById(id) {
  return UserModel.findOne(id).exec();
};

/**
 * Authenticates an user against the user registry
 * @param  {Object} user Basic user object, which contains credentials information
 * @return {Promise}     Promise as result of the comparison
 */
UserService.prototype.authenticateUser = function authenticateUser(user) {
  return UserModel
    .findOne({ username: user.username })
    .exec()
    .then(function validatePassword(userObject) {
      if (userObject === null) return null;

      return userObject.authenticate(user.password);
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
