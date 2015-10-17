const RolModel = require('src/models/role').Model;

function RolService() {}

/**
 * Creates a new user role
 * @param  {Object} rol Meta information to create a rol
 * @return {Promise}    Creation result
 */
RolService.prototype.createRol = function createRol(rol) {
  const model = new RolModel(rol);

  return model.save();
};


module.exports = RolService;
