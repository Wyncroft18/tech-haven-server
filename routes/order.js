const express = require("express");
const orderController = require("../controllers/order");

const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/add-to-checkout", verify, orderController.addToCheckout);

router.get("/", verify, orderController.getUserOrder);

router.get("/all", verify, verifyAdmin, orderController.getAllOrders);

module.exports = router;
