const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    imgUrl: {
        type: String,
        required: [true, "Image is required."],
    },
});

module.exports = mongoose.model("User", userSchema);
