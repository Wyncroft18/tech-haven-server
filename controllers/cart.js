const Cart = require("../models/Cart");
const Product = require("../models/Product");

module.exports.addToCart = async (req, res) => {
    try {
        // get user id for cart
        const userId = req.user.id;

        // product info from body
        const { productId, quantity } = req.body;

        // get the product
        const existingProduct = await Product.findOne({ _id: productId });

        // get the cart
        const existingCart = await Cart.findOne({ userId });

        const name = existingProduct.name;
        const price = existingProduct.price;

        // If cart does not exist, create one
        if (!existingCart) {
            // create object for cart items
            let cartItems = [
                {
                    productId: productId,
                    name: name,
                    quantity: quantity,
                    subtotal: quantity * price,
                },
            ];

            // create a new cart
            let newCart = new Cart({
                userId: userId,
                cartItems: cartItems,
                totalPrice: cartItems.reduce(
                    (total, item) => total + item.subtotal,
                    0
                ),
            });

            // save cart
            const result = await newCart.save();

            // send a response status of 201 and the result
            res.status(201).json(result);
        } else {
            /*
                Check if cart items already has an instance of the product being added
            */

            function checkProductInCart() {
                let productIsInCart = false;

                existingCart.cartItems.forEach((product) => {
                    if (product.productId === productId) {
                        productIsInCart = true;
                    }
                });

                return productIsInCart;
            }

            /* 
                If product is already in cart items then, increase the quantity according to the quantity being added. Else, push the item being added to cart.
            */

            if (checkProductInCart()) {
                /*
                    Iterate over the cart items and find the matching productId
                */
                existingCart.cartItems.forEach((product) => {
                    if (product.productId === productId) {
                        product.quantity += Number(quantity);
                        product.subtotal = product.quantity * price;
                    }
                });
            } else {
                existingCart.cartItems.push({
                    productId: productId,
                    name: name,
                    quantity: quantity,
                    subtotal: quantity * price,
                });
            }

            // Get the total
            existingCart.totalPrice = existingCart.cartItems.reduce(
                (total, item) => total + item.subtotal,
                0
            );

            // save cart
            const result = await existingCart.save();

            // send a status code of 201 and the result
            res.status(201).json(result);
        }
    } catch (error) {
        console.error("Can't add item:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports.getSingleCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingCart = await Cart.findOne({ userId });

        if (existingCart) {
            res.status(200).json(existingCart);
        } else {
            res.status(404).json({ message: "Cart not found." });
        }
    } catch (error) {
        console.log("Can't retrieve cart:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
