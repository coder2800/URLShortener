const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true,
        default: "normal" // normal, admin
    },
    ProfilePhoto: {
        type: String,
        default: ""
    }
})

const USER = mongoose.model("user", userSchema);

module.exports = USER;