// User function
const User = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;

// Get all users without the password
module.exports.getAllUsers = (req, res) => {
  User.find().select('-password')
    .then(things => res.status(200).json(things))
    .catch(error => res.status(200).json({ error }));
};

// Get a specific user without the password
module.exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id }).select('-password')
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(200).json({ error }));
};

// Update a specific user
module.exports.updateUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(200).json({ error }));
};

// Delete a specific user
module.exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'User deleted !' }))
    .catch(error => res.status(200).json({ error }));
};
