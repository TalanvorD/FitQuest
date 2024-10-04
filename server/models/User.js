const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  level: {
    type: Number,
    default: 0,
  },
  expPoints: {
    type: Number,
    default: 0,
  },
  mainGoal: { // STR, INT, STA, VIT
    type: String,
  },
  strength: {
    type: Number,
    default: 0,
  },
  intellect: {
    type: Number,
    default: 0,
  },
  stamina: {
    type: Number,
    default: 0,
  },
  vitality: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    },
  ],
  height: { // Standard, feet/inches
    type: Number,
  },
  weightTrack: [ // Standard, pounds
    {
      recordedWeight: {
        type: Number,
      },
      recordedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  bodyFatTrack: [
    {
      recordedBodyFat: {
        type: Number,
      },
      recordedAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;