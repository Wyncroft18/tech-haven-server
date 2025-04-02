const Cart = require("../models/Cart");
const Product = require("../models/Product");

module.exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const existingProduct = await Product.findOne({ _id: productId });

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        const existingCart = await Cart.findOne({ userId });

        const name = existingProduct.name;
        const price = existingProduct.price;

        if (!existingCart) {
            let cartItems = [
                {
                    productId: productId,
                    name: name,
                    quantity: quantity,
                    subtotal: quantity * price,
                },
            ];

            let newCart = new Cart({
                userId: userId,
                cartItems: cartItems,
                totalPrice: cartItems.reduce(
                    (total, item) => total + item.subtotal,
                    0
                ),
            });

            const result = await newCart.save();
            res.status(201).json(result);
        } else {
            const subtotal = quantity * price;

            existingCart.cartItems.push({
                productId: productId,
                name: name,
                quantity: quantity,
                subtotal: subtotal,
            });

            existingCart.totalPrice = existingCart.cartItems.reduce(
                (total, item) => total + item.subtotal,
                0
            );

            const result = await existingCart.save();
            res.status(201).json({ cart: result });
        }
    } catch (error) {
        console.error("Can't add item:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports.getSingleCart = async (req, res) => {
    try {

        const userId = req.user.id

        const existingCart = await Cart.findOne({ userId })

        if (existingCart) {
            res.status(200).json(existingCart)
        } else {
            res.status(404).json({ message: "Cart not found."})
        }

    } catch (error) {
        console.log("Can't retrieve cart:", error)
        res.status(500).json({ message: "Internal server error."})
    }
}