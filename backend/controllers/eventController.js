const Event = require('../models/eventModel');
const User = require('../models/UserModel');
const { dateReduction } = require('../utils/date');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.createEvent = async (req, res) => {
  const { adminId, title, activity, start, end, lastCancelation, isPrivate, maxPlaces, description, region, city } = req.body;
  try {
    const errors = {adminId: "", activity: "", start: "", end: ""};
    if (!ObjectId.isValid(adminId)) {
      errors.adminId = "Admin non reconnu";
    }
    if (!ObjectId.isValid(activity)) {
      errors.activity = "Activité non reconnue";
    }
    let date = new Date();
    const eventStart = new Date(start);
    const eventEnd = new Date(end);
    const eventLastCancelation = (dateReduction(eventStart, lastCancelation)).toISOString();
    if (!start || eventStart < date) {
      errors.start = "Date de début incorrecte";
    }
    if (!end || eventEnd < date || eventEnd < eventStart) {
      errors.end = "Date de fin incorrecte";
    } 
    if (errors.adminId !== "" || errors.activity !== "" || errors.start !== "" || errors.end !== "") {
      res.status(200).json(errors);
    } else {
      const event = await Event.create({
        adminId,
        title,
        activity,
        start,
        end,
        lastCancelation: eventLastCancelation,
        isPrivate,
        maxPlaces,
        description,
        region,
        city
      });
      await User.updateOne(
        { _id: adminId},
        { $addToSet: { organized_events: event._id} },
        { new: true }
      );
      res.status(201).json(event);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.getEventsInCity = (req, res) => {

};

module.exports.getOneEvent = (req, res) => {
  Event.findOne({ _id: req.params.id })
    .then((event) => res.status(200).json(event))
    .catch((error) => res.status(200).json({ error }));
};

module.exports.deleteEvent = (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Event deleted !' }))
    .catch(error => res.status(200).json({ error }));
};

module.exports.joinEvent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
    return res.status(400).json('Evenement ou utilisateur invalide');
  const event = await Event.findOne({ _id: req.params.id})
    .then((event) => event);
  const user = await User.findOne({ _id: req.body.userId })
    .then((user) => user);
  if (!event || !user)
    return res.status(400).json();
  if (event.participants.includes(user._id) || user.participations.includes(event._id))
    return res.status(200).json('Évenement déjà rejoint');
  if (req.body.userId !== undefined && event.adminId === req.body.userId)
    return res.status(200).json('Impossible de rejoindre, vous êtes l\'organisateur');
  if (user.credits < 20) {
    return res.status(200).json('Crédits insuffisants');
  }
  if (event.maxPlaces === null || event.participants.length < event.maxPlaces) {
    await User.updateOne(
      { _id: req.body.userId},
      { $inc: { credits: -20 }, $addToSet: { participations: event._id} },
      { new: true}
    );
    Event.updateOne(
      { _id: req.params.id},
      { $addToSet: { participants: req.body.userId } },
      { new: true},
    )
      .then((event) => res.status(200).json(event))
      .catch((err) => res.status(400).json({ err }));
  } else {
    res.status(200).json('L\'évenement est complet');
  }
}
