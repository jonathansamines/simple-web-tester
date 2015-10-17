const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answerId: Schema.Types.ObjectId,
  description: {
    type: String,
    required: true
  },
  isValidAnswer: {
    type: Boolean,
    default: false
  },
  help: String
});

module.exports = {
  Model: mongoose.model('Answer', AnswerSchema),
  Schema: AnswerSchema
};
