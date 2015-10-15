const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  testId: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  intentsNumber: Number,
  canRetryQuestions: {
    type: Boolean,
    default: false
  },
  tags: [String],
  value: {
    type: Number,
    default: 100
  }
});

module.exports = mongoose.model('Test', TestSchema);
