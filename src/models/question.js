const mongoose = require('mongoose');
const AnswerSchema = require('src/models/answer').Schema;
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
  answers: [AnswerSchema]
});

module.exports = {
  Model: mongoose.model('Question', QuestionSchema),
  Schema: QuestionSchema
};
