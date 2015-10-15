const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const TestIntentSchema = new Schema({
  testIntentId: Schema.Types.ObjectId,
  startedDate: {
    type: Date,
    default: Date.now
  },
  endedDate: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  lastSolvedQuestion: {
    type: Schema.Types.ObjectId,
    ref: 'AnswerIntent'
  }
});

TestIntentSchema.virtual('timeElapsed').get(function computeTime() {
  return moment().from(this.startedDate);
});

module.exports = mongoose.model('TestIntent', TestIntentSchema);
