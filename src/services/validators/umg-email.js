const validators = {};

/**
 * Verify if a given email address is a valid student email
 * @param  {String}  email Email address to validate
 */
validators.isValidUmgEmail = function isValidUmgEmail(email) {
  const validator = new RegExp('[\w]*@miumg.edu.gt');

  return validator.test(email);
};

module.exports = validators;
