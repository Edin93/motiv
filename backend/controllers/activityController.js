const User = require('../models/UserModel');
const Activity = require('../models/activityModel');
const User = require('../models/UserModel');
const { getActivities, getUsers } = require('../utils/controllerFunctions');
const { createActivityErrors } = require('../utils/error');

// Create an activity
module.exports.createActivity = async (req, res) => {
  try {
    const activity = await Activity.create({...req.body});
    res.status(201).json({ activity: activity._id });
  } catch (err) {
    let errors = createActivityErrors(err);
    res.status(200).json({ errors });
  }
}

// Get all activities
module.exports.getAllActivities = (req, res) => {
  Activity.find()
    .then(activities => res.status(200).json(activities))
    .catch(error => res.status(200).json({ error }));
};

// Get a specific activity
module.exports.getOneActivity = (req, res) => {
  Activity.findOne({ _id: req.params.id })
    .then(activity => res.status(200).json(activity))
    .catch(error => res.status(200).json({ error }));
};

// Update a specific activity
module.exports.updateActivity = (req, res) => {
  Activity.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
    .then(activity => res.status(200).json(activity))
    .catch(error => res.status(200).json({ error }));
};

// Delete a specific activity
module.exports.deleteActivity = (req, res) => {
  Activity.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Activity deleted !' }))
    .catch(error => res.status(200).json({ error }));
};

// Get the count of users for each activity
module.exports.getCount = async (req, res) => {
  try {
    const activities = await getActivities();
    const activitiesDict = [];
    const users = await getUsers();
    activities.forEach((activity) => {
      activitiesDict.push({name: activity.name, id: activity._id, users: 0});
    });
    users.forEach((user) => {
      activitiesDict.forEach((activity) => {
        if (user.activities.includes(activity.id)) {
          activity.users++;
        }
      })
    })
    res.status(200).json(activitiesDict);
  } catch (error) {
    res.status(200).json({ error });
  }
}
