const Product = require("../models/Product");

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            return res.status(200).json({ products });
        } else {
            return res.status(200).json({ message: "No products found." });
        }
    } catch (error) {
        console.error("Error in finding all products:", error);
        res.status(500).json({ error: "Error in finding products." });
    }
};
