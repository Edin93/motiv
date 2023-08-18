const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    icon: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    rules: {
      type: String,
    },
  }
);

module.exports = mongoose.model("Activity", activitySchema);
