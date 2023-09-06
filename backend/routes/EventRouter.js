const eventController = require('../controllers/eventController');
const router = require('express').Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.post('/search', eventController.getEventsFilters);
router.get('/:id', eventController.getOneEvent);
router.delete('/:id', eventController.deleteEvent);
router.post('/join/:id', eventController.joinEvent);
router.post('/leave/:id', eventController.leaveEvent);

module.exports = router;
