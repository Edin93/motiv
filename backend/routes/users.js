const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Getting all the users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one user
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

// Creating one user
router.post("/", async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err. message });
    }
})

// Updating one user
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one user
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "Deleted user account"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user"});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};

module.exports = router;
