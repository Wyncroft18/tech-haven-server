const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/", userController.registerUser);

router.post("/login", userController.userAuthentication);

module.exports = router;
