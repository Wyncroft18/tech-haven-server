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

module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    if (typeof token === "undefined") {
        return res.json({ auth: "Failed. No token." });
    } else {
        token = token.slice(7, token.length);

        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.json({
                    auth: "Failed",
                    message: err.message,
                });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    }
};

module.exports.verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({
            auth: "Failed",
            message: "Action Forbidden",
        });
    }
};
