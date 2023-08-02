const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { isEmail } = require ('validator');

const userSchema = new mongoose.Schema(
{
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
            maxlength: 20,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        region: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        biography: {
            type: String,
            max: 1024,
        },
        participations: {
            type: [String],
        },
        organized_events: {
            type: [String],
        },
        credits: {
            type: Number,
            default: 20,
        },
        picture: {
            type: String,
        },
        following: {
        type: [String]
        },
        followers: {
        type: [String]
        },
        notification: {
            type: [String],
        },
        reviews: {
            type: [String],
        },
        activities: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model("User", userSchema);
