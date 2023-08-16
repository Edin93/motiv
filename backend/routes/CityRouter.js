const cityController = require('../controllers/cityController');
const router = require('express').Router();

// City routes
router.post("/", cityController.createCity);
router.get("/", cityController.getAllCities);
router.get("/:id", cityController.getOneCity);
router.put("/:id", cityController.updateOneCity);
router.delete("/:id", cityController.deleteOneCity);

module.exports = router;
