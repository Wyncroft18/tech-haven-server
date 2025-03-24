const jwt = require("jsonwebtoken");

const secret = "Tech_Haven_E-commerce_Api";

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
    };

    return jwt.sign(data, secret, { expiresIn: "1h" });
};