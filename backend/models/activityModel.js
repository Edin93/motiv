const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
              'Football',
              'Tennis',
              'Basket',
              'Beach Volley',
              'Volley',
              'Randonnée',
              'Running',
              'Bridge',
              'Fitness',
              'Ping-Pong',
              'Escalade',
              'Badminton',
              'Cyclisme',
              'Danse',
              'Rugby',
              'Futsal',
              'Gymnastique',
              'Handball',
              'Surf',
              'Pétanque',           
            ],
      required: true,
      trim: true,
    },
    icon: {
      type: String,
    },
    rules: {
      type: String,
      required: true,
    },
  }
);

module.exports = mongoose.model("Activity", activitySchema);
