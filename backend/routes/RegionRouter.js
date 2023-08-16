const regionController = require('../controllers/regionController');
const router = require('express').Router();

// Region routes
router.post("/", regionController.createRegion);
router.get("/", regionController.getAllRegions);
router.get("/:id", regionController.getOneRegion);
router.put("/:id", regionController.updateRegion);
router.delete("/:id", regionController.deleteRegion);

module.exports = router;
