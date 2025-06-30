// imports
const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products) {
            return res.status(200).json({ message: "No products found." });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error in finding all products:", error);
        res.status(500).json({ error: "Error in finding products." });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, description, price, imgUrl, alt } = req.body;

        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(409).json({ error: "Product already exists." });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            imgUrl,
            alt,
        });

        const result = await newProduct.save();
        res.status(201).json(result);
    } catch (error) {
        console.error("Error in adding product:", error);
        res.status(500).json({ error: "Error in adding product." });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error("Error in fetching the product:", error);
        res.status(500).json({ error: "Error in retrieving product." });
    }
};
