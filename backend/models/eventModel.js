const mongoose = require('mongoose');
const activitySchema = require('./activityModel');
const regionSchema = require('./regionModel');
const citySchema = require('./cityModel');

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
    womenOnly: {
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
      type: Date,
      required: true,
    },
    participants : {
      type: [String]
    },
    lastCancelation: {
      type: Date,
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
