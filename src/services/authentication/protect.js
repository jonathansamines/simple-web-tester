/**
 * Express compliant middleware which verifies if the current request is authenticated
 * @param  {Object}   req  Express request object
 * @param  {Object}   res  Express response object
 * @param  {Function} next Next middleware
 */
module.exports = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/login');
};
