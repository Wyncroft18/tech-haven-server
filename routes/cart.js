const express = require("express");
const cartController = require("../controllers/cart");

const { verify } = require("../auth");

const router = express.Router();

router.post("/add-to-cart", verify, cartController.addToCart);

router.get("/", verify, cartController.getSingleCart);

module.exports = router;
