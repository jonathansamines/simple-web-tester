const RolModel = require('src/models/role').Model;
const RolEnum = require('src/models/role').Enum;

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

RolService.prototype.getAdminRol = function getAdminRol() {
  return RolModel.find({ code: RolEnum.TEACHER }).exec();
};

RolService.prototype.getStudentRol = function getStudentRol() {
  return RolModel.find({ code: RolEnum.STUDENT });
};


module.exports = RolService;
