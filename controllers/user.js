const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.exists({ email });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "Email is already registered." });
        }

        const newUser = new User({
            email: email,
            password: bcrypt.hashSync(password, 10),
        });

        const result = await newUser.save();

        res.status(201).json({
            message: "User registered successfully.",
            user: result,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Error in registering user." });
    }
};
