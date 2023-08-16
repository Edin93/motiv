const City = require('../models/cityModel');
const Region = require('../models/regionModel');
const ObjectId = require('mongoose').Types.ObjectId;

// Create a city and link it to a region
module.exports.createCity = async (req, res) => {
  if (!(ObjectId.isValid(req.body.regionId)))
    return res.status(400).send('Id unknow');
  const { name, regionId } = req.body;
  try {
    const city = await City.create({name, regionId});
    await Region.findByIdAndUpdate(regionId, { $addToSet: { cityIds: city._id } }, {new: true})
    res.status(201).json(city);
  } catch(err) {
    res.status(200).json({ err });
  }
};

// Get all cities
module.exports.getAllCities = (req, res) => {
  City.find()
    .then(city => res.status(200).json(city))
    .catch(err => res.status(200).json({ err }));
};

// Get one city
module.exports.getOneCity = (req, res) => {
  City.findById(req.params.id)
    .then(city => res.status(200).json(city))
    .catch(err => res.status(200).json({ err }));
};

// Update one city
module.exports.updateOneCity = (req, res) => {
  City.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }, {new: true})
    .then(city => res.status(200).json(city))
    .catch(error => res.status(200).json({ error }));
}

// Delete one city
module.exports.deleteOneCity = async (req, res) => {
  City.findOne({_id: req.params.id})
    .then(async (city) => {
      await Region.findByIdAndUpdate(city.regionId, { $pull: { cityIds: city._id } }, {new: true})
    })
    .catch((err) => console.log(err));
  City.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'City deleted !' }))
    .catch(error => res.status(200).json({ error }));
}
