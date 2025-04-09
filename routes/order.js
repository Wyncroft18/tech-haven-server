const express = require("express");
const orderController = require("../controllers/order");

const { verify } = require("../auth");

const router = express.Router();

router.post("/add-to-checkout", verify, orderController.addToCheckout);

router.get("/", verify, orderController.getUserOrder)

module.exports = router;
