const mongoose = require('mongoose');
const QuestionSchema = require('src/models/question').Schema;
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  testId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
  questions: [QuestionSchema],
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = {
  Model: mongoose.model('Test', TestSchema),
  Schema: TestSchema
};
