const Activity = require('../models/activityModel').Activity;
const User = require('../models/UserModel');
const Event = require('../models/eventModel');

module.exports.getActivities = async () => {
  const activities = Activity.find()
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

module.exports.deleteCompletedEvents = () => {
  setInterval( async () => {
    await Event.find()
      .then((events) => {
        const date = new Date();
        events.forEach((event) => {
          const cancelDate = new Date(event.end);
          cancelDate.setDate(cancelDate.getDate() + 7);
          if (date > cancelDate) {
            Event.deleteOne({ _id: event._id})
              .then(() => {});
          }
        })
      })
      .catch((err) => console.log(err));
  }, 5000);
};
