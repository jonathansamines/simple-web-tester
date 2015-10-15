const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: Schema.Types.ObjectId,
  description: String
});

module.exports = mongoose.model('Role', RoleSchema);
