const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { isEmail } = require ('validator');

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
            minlength: 4,
            maxlength: 20,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
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
        notifications: {
            type: [String],
        },
        recommandations: {
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
        if(user.emailConfirm)
        {

            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect validation')
    }
    throw Error('incorrect email');
}

module.exports = mongoose.model('User', userSchema);
