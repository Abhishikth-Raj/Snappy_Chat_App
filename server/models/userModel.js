const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        unique: true, // this is to make sure that no two users have the same username
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    isAvatarImageSet : {
        type: Boolean,
        default: false
    },
    avatarImage:{
        type: String,
        default: ""
    },
});

module.exports = mongoose.model("User", userSchema);