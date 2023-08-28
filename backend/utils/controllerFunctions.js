const Activity = require('../models/activityModel');
const User = require('../models/UserModel');

module.exports.getActivities = async () => {
  const activities = await Activity.find()
    .then((activities) => {return activities})
    .catch((error) => {return error});
  return activities;
}

module.exports.getUsers = async () => {
  const users = await User.find()
    .then((users) => {return users})
    .catch((error) => {return error});
  return users;
}
