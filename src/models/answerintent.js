const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerIntentSchema = new Schema({
  answerIntentId: Schema.Types.ObjectId,
  isCorrect: {
    type: Boolean,
    default: false
  },
  answeredDate: {
    type: Date,
    default: Date.now
  },
  originalAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  },
  testIntent: {
    type: Schema.Types.ObjectId,
    ref: 'TestIntent'
  }
});

module.exports = {
  Model: mongoose.model('AnswerIntent', AnswerIntentSchema),
  Schema: AnswerIntentSchema
};
