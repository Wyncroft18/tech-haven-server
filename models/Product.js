const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required."],
    },
    price: {
        type: Number,
        required: [true, "Product price is required."],
    },
    imgUrl: {
        type: String,
        required: [true, "Product image is required."],
    },
    alt: {
        type: String,
        required: [true, "Alt text is required for accessibility."],
    },
});

module.exports = mongoose.model("Product", productSchema);
