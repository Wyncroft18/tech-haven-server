const express = require("express");
const productController = require("../controllers/product");
const auth = require("../auth")

const router = express.Router();

router.get("/", productController.getAllProducts);

router.post("/", auth.verify, auth.verifyAdmin, productController.addProduct);

router.get("/:productId", productController.singleProduct)

module.exports = router;
