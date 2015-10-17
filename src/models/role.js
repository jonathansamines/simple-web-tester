const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleId: Schema.Types.ObjectId,
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = {
  Model: mongoose.model('Role', RoleSchema),
  Schema: RoleSchema,
  Enum: {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER'
  }
};
