const auth = require('../controllers/auth');
const userController = require('../controllers/UserController');
const router = require('express').Router();

// Authentification route
router.post("/register", auth.signUp);
router.post("/login", auth.signIn);
router.post("/confirmEmail/:id", auth.confirmEmail);
router.post("/sendEmailLost/:id", auth.sendEmailConfirmation);
router.get("/logout", auth.logout);

// user routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
