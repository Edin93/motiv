const activityController = require('../controllers/activityController');
const router = require('express').Router();

// Activities route
router.post("/", activityController.createActivity);
router.get("/", activityController.getAllActivities);

router.get("/:id", activityController.getOneActivity);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);

module.exports = router;
