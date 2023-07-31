const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/UserModel");

const UserController = require("../controllers/UserController");

// Getting all the users
userRouter.get("/", UserController.getAllUsers);

// Getting one user
userRouter.get("/:id", getUser, UserController.getOneUser);

// Creating one user
userRouter.post("/", UserController.CreateOneUser);

// Updating one user
userRouter.patch("/:id", getUser, UserController.UpdateOneUser);

// Deleting one user
userRouter.delete("/:id", getUser, UserController.DeleteOneUser);


async function getUser(req, res, next) {
    let user;
    try {
        user = await UserModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};

module.exports = userRouter;
