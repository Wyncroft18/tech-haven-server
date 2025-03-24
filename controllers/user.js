const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

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

module.exports.userAuthentication = async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: "Email not found." });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(
                password,
                existingUser.password
            );

            if (isPasswordCorrect) {
                return res
                    .status(200)
                    .json({ access: auth.createAccessToken(existingUser) });
            } else {
                return res
                    .status(401)
                    .json({ error: "Email and password do not match." });
            }
        }
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ error: "Error authenticating user." });
    }
};
