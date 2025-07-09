// imports
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
    // find all products
    const products = await Product.find();

    // return the products
    return res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

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

exports.getSingleProduct = catchAsync(async (req, res, next) => {
    // find product
    const product = await Product.findById(req.params.productId);

    return res.status(200).json({
        status: "success",
        data: product,
    });
});
