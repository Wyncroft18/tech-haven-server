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

module.exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, imgUrl, alt } = req.body;

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(409).json({ error: "Product already exists." });
        } else {
            let newProduct = new Product({ name, description, price, imgUrl, alt });

            const result = await newProduct.save();
            res.status(201).json(result);
        }
    } catch (error) {
        console.error("Error in adding product:", error);
        res.status(500).json({ error: "Error in adding product." });
    }
};
