const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth")

const router = express.Router();

router.post("/", userController.registerUser);

router.post("/login", userController.userAuthentication);

router.get("/details", auth.verify, userController.userDetails)

module.exports = router;
