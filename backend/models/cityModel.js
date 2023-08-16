const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    users: {
      type: [String],
    },
    regionId: {
      type: String,
    },
  }
);

module.exports = mongoose.model("City", citySchema);
