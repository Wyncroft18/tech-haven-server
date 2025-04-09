const Order = require("../models/Order");
const Cart = require("../models/Cart");

module.exports.addToCheckout = async (req, res) => {
    try {
        const userId = req.user.id;

        const existingCart = await Cart.findOne({ userId });

        if (!existingCart) {
            res.status(404).json({ message: "Cart not found." });
        } else {
            if (existingCart.cartItems.length > 0) {
                const newOrder = new Order({
                    userId: userId,
                    productsOrdered: existingCart.cartItems,
                    totalPrice: existingCart.totalPrice,
                });

                const deletedCart = await Cart.deleteOne({ userId });

                const savedOrder = await newOrder.save();
                res.status(201).json({ order: newOrder });
            } else {
                res.status(404).json({
                    message: "There is no item on your cart.",
                });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        res.send(500).json({ message: "Internal server error." });
    }
};

module.exports.getUserOrder = async (req, res) => {
    try {
        const userId = req.user.id

        const userOrders = await Order.find({ userId })

        res.status(200).json({ userOrders })

    } catch (error) {
        console.error("Error retrieving user order:", error);
        res.send(500).json({ message: "Internal server error." });
    }
};
