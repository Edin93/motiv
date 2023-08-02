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

// Follow an user
module.exports.follow = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.params.idToFollow))) {
    return res.status(400).send('Id unknow');
  }
  User.findByIdAndUpdate(req.params.id, { $addToSet: { following: req.body.idToFollow } }, {new: true})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(200).json({ error }));

  User.findByIdAndUpdate(req.body.idToFollow, { $addToSet: { followers: req.params.id } })
    .catch(error => res.status(200).json({ error }));
};

// Unfollow an user
module.exports.unfollow = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.params.idToUnfollow))) {
    return res.status(200).send('Id unknow');
  }
  User.findByIdAndUpdate(req.params.id, { $pull: { following: req.body.idToUnfollow } }, {new: true})
    .then(() => res.status(200).json({ message: 'Unfollow successed' }))
    .catch(error => res.status(200).json({ error }));

  User.findByIdAndUpdate(req.body.idToUnfollow, { $pull: { followers: req.params.id } })
    .catch(error => res.status(200).json({ error }));
};
