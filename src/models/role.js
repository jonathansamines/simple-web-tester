const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: Schema.Types.ObjectId,
  name: String
});

module.exports = {
  Model: mongoose.model('Role', RoleSchema),
  Schema: RoleSchema
};
