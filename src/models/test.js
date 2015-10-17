const mongoose = require('mongoose');
const QuestionSchema = require('src/models/question').Schema;
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  testId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  intentsNumber: Number,
  value: {
    type: Number,
    default: 100
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  questions: [QuestionSchema]
});

module.exports = {
  Model: mongoose.model('Test', TestSchema),
  Schema: TestSchema
};
