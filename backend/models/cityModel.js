const { default: mongoose } = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    countryCode: {
      type: String,
    },
    stateCode: {
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

module.exports = citySchema;
