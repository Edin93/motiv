// User function
const User = require('../models/UserModel');
const ObjectId = require('mongoose').Types.ObjectId;
const sharp = require('sharp');

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

// Recommand a user
module.exports.recommend = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.body.idToRecommand))) {
    return res.status(400).send('Id inconnu');
  }
  User.findByIdAndUpdate(req.params.id, { $addToSet: { refferal: req.body.idToRecommand } }, {new: true})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(200).json({ error }));

  User.findByIdAndUpdate(req.body.idToRecommand, { $addToSet: { recommandations: req.params.id } })
    .catch(error => res.status(200).json({ error }));
};

// Delete a recommandation for a user
module.exports.deleteRecommendation = (req, res) => {
  if (!(ObjectId.isValid(req.params.id) || ObjectId.isValid(req.body.idToDelete))) {
    return res.status(200).send('Id inconnu');
  }
  User.findByIdAndUpdate(req.params.id, { $pull: { refferal: req.body.idToDelete } }, {new: true})
    .then(() => res.status(200).json({ message: 'Recommandation enlevée' }))
    .catch(error => res.status(200).json({ error }));

  User.findByIdAndUpdate(req.body.idToDelete, { $pull: { recommandations: req.params.id } })
    .catch(error => res.status(200).json({ error }));
};

// Upload profile image
module.exports.uploadImage = async (req, res) => {
  const { userId } = req.body;
  const filename = `${userId}.png`
  const dirImage = `${__dirname}/../../frontend/uploads/${filename}`;
  try {
    await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toFile(dirImage);
    User.findOneAndUpdate({_id: userId}, {picture: `${filename}`}, {new: true})
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(200).json({ err }));
  } catch (err) {
    console.log(err);
    res.status(200).json({ err });
  }
}
