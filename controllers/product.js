// imports
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res, next) => {
    // find all products
    const products = await Product.find();

    // send response
    return res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
});

exports.addProduct = catchAsync(async (req, res, next) => {
    const { name, description, price, imgUrl, alt } = req.body;

    // create new product
    const newProduct = new Product({
        name,
        description,
        price,
        imgUrl,
        alt,
    });

    // save product to DB
    const result = await newProduct.save();

    // send response
    res.status(201).json({
        status: "success",
        data: {
            result,
        },
    });
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
    // find product
    const product = await Product.findById(req.params.productId);

    // send response
    return res.status(200).json({
        status: "success",
        data: product,
    });
});
