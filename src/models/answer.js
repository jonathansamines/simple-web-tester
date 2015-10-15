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
  help: String,
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
});

module.exports = mongoose.model('Answer', AnswerSchema);
