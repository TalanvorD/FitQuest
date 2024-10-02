const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const activitySchema = new Schema({
  name: {
    type: String,
    required: 'You need to name this activity!',
    trim: true,
  },
  calorieBurn: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  statType: { // STR, INT, STA, VIT
    type: String,
    required: true,
  },
  activityCreator: {
    type: String,
    required: true,
  },
});

const Activity = model('Activity', activitySchema);

module.exports = Activity;
