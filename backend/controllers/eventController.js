const Event = require('../models/eventModel');
const User = require('../models/UserModel');
const { dateReduction } = require('../utils/date');
const ObjectId = require('mongoose').Types.ObjectId;


// Create an event and add it to the user
module.exports.createEvent = async (req, res) => {
  const { adminId, title, activity, start, end, lastCancelation, isPrivate, maxPlaces, description, region, city } = req.body;
  try {
    const errors = {adminId: "", activity: "", start: "", end: ""};
    if (!ObjectId.isValid(adminId)) {
      errors.adminId = "Admin non reconnu";
    }
    if (!ObjectId.isValid(activity._id)) {
      errors.activity = "Activité non reconnue";
    }
    let date = new Date();
    const eventStart = new Date(start);
    const eventEnd = new Date(end);
    const eventLastCancelation = (dateReduction(eventStart, lastCancelation)).toISOString();
    console.log(eventStart);
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
      await User.findByIdAndUpdate(
        { _id: adminId},
        { $addToSet: { organized_events: event._id} },
        { new: true }
      )
        .then((newUser) => res.status(201).json({message: "Évenement créé", event, newUser}));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

// Get all the events
module.exports.getAllEvents = (req, res) => {
  Event.find()
    .then((events) => res.status(200).json(events))
}

// Get all the events filtered
module.exports.getEventsFilters = async (req, res) => {
  const events = await Event.find();
  const { title, city, activity, userId } = req.body;
  const filteredEvents = events.filter(event => {

    if (event.participants.includes(userId) || event.adminId === userId)
      return false;

    if (title && title.length > 0) {
      const eventTitle = event.title.toLowerCase();
      if (!eventTitle.includes(title.toLowerCase())) {
        return false;
      }
    }
    if (activity && activity.length > 0) {
      if (!activity.includes(event.activity.id)) {
        return false;
      }
    }
    if (city) {
      const eventCity = event.city.name.toLowerCase();
      if (!eventCity.includes(city.name.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  if (filteredEvents.length > 0) {
    res.status(200).json({ message: 'Événement(s) trouvé(s)', filteredEvents});
  } else {
    res.status(200).json({ message: 'Aucun événement'})
  }
};

// Get a specific event
module.exports.getOneEvent = (req, res) => {
  Event.findOne({ _id: req.params.id })
    .then((event) => res.status(200).json(event))
    .catch((error) => res.status(200).json({ error }));
};

// Delete a specific event
module.exports.deleteEvent = (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Event supprimé !' }))
    .catch(error => res.status(200).json({ error }));
};

// Join an event if the user have 20 or more credits and if the event is not full
module.exports.joinEvent = async (req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
    return res.status(400).json({message: 'Evenement ou utilisateur invalide'});
  const event = await Event.findOne({ _id: req.params.id})
    .then((event) => event);
  const user = await User.findOne({ _id: req.body.userId })
    .then((user) => user);
  if (!event || !user)
    return res.status(400).json();
  if (event.participants.includes(user._id) || user.participations.includes(event._id))
    return res.status(200).json({message: 'Évenement déjà rejoint'});
  if (req.body.userId !== undefined && event.adminId === req.body.userId)
    return res.status(200).json({message: 'Impossible de rejoindre, vous êtes l\'organisateur'});
  if (user.credits < 20) {
    return res.status(200).json({message: 'Crédits insuffisants'});
  }
  if (event.maxPlaces === null || event.participants.length < event.maxPlaces) {
    const newUser = await User.findByIdAndUpdate(
      req.body.userId,
      { $inc: { credits: -20 }, $addToSet: { participations: event._id} },
      { new: true}
    );
    Event.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { participants: req.body.userId } },
      { new: true},
    )
      .then((newEvent) => res.status(200).json({successMessage: "Événement rejoint, vous avez dépensé 20 crédits", newUser, newEvent}));
  } else {
    res.status(200).json({message: 'L\'évenement est complet'});
  }
}

// Leave the event and lose credits if last cancelation date is passed
module.exports.leaveEvent = async (req, res) => {
  const creditsLost = req.body.creditsLost || false;
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.userId))
    return res.status(400).json({message: 'Evenement ou utilisateur invalide'});
  const event = await Event.findOne({ _id: req.params.id})
    .then((event) => event);
  const user = await User.findOne({ _id: req.body.userId })
    .then((user) => user);
  if (!event || !user)
    return res.status(400).json();
  if (!event.participants.includes(user._id) || !user.participations.includes(event._id))
    return res.status(200).json({message: 'Évenement non rejoint'});
  if (req.body.userId !== undefined && event.adminId === req.body.userId)
    return res.status(200).json({message: 'Impossible de partir, vous êtes l\'organisateur. Vous pouvez cependant supprimer l\'événement'});
  try {
    const newEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $pull: { participants: req.body.userId } },
      { new: true},
    )
    if (creditsLost)
    await User.findByIdAndUpdate(
      req.body.userId,
      { $pull: { participations: event._id} },
      { new: true}
    )
      .then((newUser) => res.status(200).json({successMessage: "Événement quitté, vous avez perdu 20 crédits", newUser, newEvent}));
    else {
      await User.findByIdAndUpdate(
        req.body.userId,
        { $inc: { credits: +20 }, $pull: { participations: event._id } },
        { new: true }
      )
        .then((newUser) => res.status(200).json({successMessage: "Événement quitté, vos 20 crédits ont été réattribués", newUser, newEvent}));
    }
  } catch (error) {
    res.status(400).json({ error })
  }
};
