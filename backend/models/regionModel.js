const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cityIds: {
      type: [String],
    }
  }
);

module.exports = mongoose.model('Region', regionSchema);
