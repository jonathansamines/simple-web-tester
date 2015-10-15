const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  questionId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Test'
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
