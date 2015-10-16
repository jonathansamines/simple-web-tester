/**
 * Global parser for validation errors
 * @param  {Object} error         Either a generic Error instance or a ValidatorError
 * @param  {String} globalMessage If a mongoose validation error, this message is used to show a generic global message
 * @return {[type]}               [description]
 */
module.exports = function buildValidationError(error, globalMessage) {
  if (error && error.name === 'ValidationError') {
    return {
      message: globalMessage,
      validations: error.errors
    };
  }

  return error;
};
