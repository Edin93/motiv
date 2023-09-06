const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { isEmail } = require ('validator');
const regionSchema = require("./regionModel");
const citySchema = require("./cityModel");

const userSchema = new mongoose.Schema(
{
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 20,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        birthday: {
            type: String,
            required: true
        },
        hasToUpdatePassword: {
            type: Boolean,
            default: false
        },
        emailConfirm: {
            type: Boolean,
            default: false,
        },
        region: {
            type: regionSchema,
            trim: true,
            required: true,
        },
        city: {
            type: citySchema,
            trim: true,
            required: true,
        },
        biography: {
            type: String,
            max: 1024,
        },
        level: {
            type: String,
            default: 'Débutant',
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
            default: 'default.png'
        },
        notifications: {
            type: [String],
        },
        recommandations: {
            type: [String],
        },
        refferal: {
            type: [String],
        },
        activities: {
            type: [String],
        },
        tmp_code: {
            type: Number,
            default: null,
        },
        tmp_code_expiration: {
            type: Date,
        }
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

module.exports = mongoose.model('User', userSchema);
