const { default: mongoose } = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
    },
    isoCode: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    name: {
      type: String,
    },
  }
);

module.exports = regionSchema;
