const mongoose = require('mongoose');
const regionSchema = require('./regionModel');
const citySchema = require('./cityModel');
const activitySchema = require('./activityModel').activitySchema;

const eventSchema = mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
      maxlength: 200,
    },
    activity: {
      type: activitySchema,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    maxPlaces: {
      type: Number,
      default: null,
    },
    validationCode: {
      type: Number,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    participants: {
      type: [String]
    },
    lastCancelation: {
      type: String,
    },
    region: {
      type: regionSchema,
    },
    city: {
      type: citySchema,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
