const auth = require('../controllers/auth');
const userController = require('../controllers/UserController');
const router = require('express').Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Authentification route
router.post("/register", auth.signUp);
router.post("/login", auth.signIn);
router.post("/confirm-email/:id", auth.confirmEmail);
router.get("/send-email-lost/:id", auth.sendConfirmationCode);
router.post("/forgot-password", auth.sendResetPassword);
router.post("/reset-password/:id", auth.resetPassword);
router.post("/check-email", auth.checkEmail);
router.post("/check-username", auth.checkUsername);
router.patch("/change-email", auth.changeEmail);
router.get("/", auth.checkToken);
router.get("/logout", auth.logout);

// user routes
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/recommend/:id", userController.recommend);
router.patch("/delete-recommendation/:id", userController.deleteRecommendation);
router.post("/upload", upload.single('file'), userController.uploadImage);

module.exports = router;
