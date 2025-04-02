// imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

const port = process.env.PORT;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mongodb
mongoose.connect(process.env.MONGODB_CONNECT_URI);
mongoose.connection.once("open", () =>
    console.log("Now connected to MongoDB Atlas.")
);

// routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/carts", cartRoutes);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Api is now online on port ${port}.`);
    });
}

module.exports = { app, mongoose };
