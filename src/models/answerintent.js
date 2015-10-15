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
  testIntent: {
    type: Schema.Types.ObjectId,
    ref: 'TestIntent'
  },
  originalAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
});

module.exports = mongoose.model('AnswerIntent', AnswerIntentSchema);
