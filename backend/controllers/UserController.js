const UserModel = require("../models/UserModel");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getOneUser: (req, res) => {
        res.json(res.user);
    },
    CreateOneUser: async (req, res) => {
        const user = new UserModel({
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
    },
    UpdateOneUser: async (req, res) => {
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
    },
    DeleteOneUser: async (req, res) => {
        try {
            await res.user.deleteOne();
            res.json({ message: "Deleted user account"});
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};
