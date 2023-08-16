const mongoose = require('mongoose');
const Region = require('../models/regionModel')
const { createRegionsErrors } = require('../utils/error');

//Create a region
module.exports.createRegion = async (req, res) => {
  const name = req.body;
  try {
    const region = await Region.create(name);
    res.status(201).json(region)
  } catch(err) {
    const error = createRegionsErrors(err);
    res.status(200).json({ error });
  }
};

// Get all regions
module.exports.getAllRegions = (req, res) => {
  Region.find()
    .then(regions => res.status(200).json(regions))
    .catch(error => res.status(200).json({ error }));
};

// Get a specific region
module.exports.getOneRegion = (req, res) => {
  Region.findOne({ _id : req.params.id })
    .then(region => res.status(200).json(region))
    .catch(error => res.status(200).json({ error }));
};

// Update a specific region
module.exports.updateRegion = (req, res) => {
  Region.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
    .then(region => res.status(200).json(region))
    .catch(error => res.status(200).json({ error }));
};

// Delete a specific region
module.exports.deleteRegion = (req, res) => {
  Region.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Region deleted !' }))
    .catch(error => res.status(200).json({ error }));
};
