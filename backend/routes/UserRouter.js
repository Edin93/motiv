const auth = require('../controllers/auth');
const userController = require('../controllers/UserController');
const router = require('express').Router();

// Authentification route
router.post("/register", auth.signUp);
router.post("/login", auth.signIn);
router.post("/confirm-email/:id", auth.confirmEmail);
router.get("/send-email-lost/:id", auth.sendConfirmationCode);
router.post("/forgot-password", auth.sendResetPassword);
router.post("/reset-password/:id", auth.resetPassword);
router.post("/check-email-password", auth.checkEmailPassword);
router.post("/check-username", auth.checkUsername);

router.get("/logout", auth.logout);

// user routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
