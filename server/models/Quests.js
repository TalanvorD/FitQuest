const { Schema, model } = require('mongoose');

const questsSchema = new Schema({
  title: {
    type: String,
    required: 'You need to title this quest!',
    trim: true,
  },
  description: {
    type: String,
    required: 'You need to give this quest a description!',
  },
  statType: { // STR, INT, STA, VIT
    type: String,
    required: 'You need to give this quest a stat type!',
  },
  expValue: {
    type: Number,
    required: 'You need to give this quest a value for experience!',
  },
  time: { // Daily, Weekly, Monthly
    type: String,
    required: 'You need to give this quest a time period!',
  },
});

const Quests = model('Quests', questsSchema);

module.exports = Quests;
