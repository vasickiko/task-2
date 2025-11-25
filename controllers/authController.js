const User = require("../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateSchema = require("../helper/validateSchema");
const { RegisterUser, LoginUser } = require("../models/User/validate");

const register = async (req, res) => {
    try {
        await validateSchema(req.body, RegisterUser);

        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashed
        });

        res.json(user);

    } catch (err) {
        res.status(err.status || 500).json(err.errors || { message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        await validateSchema(req.body, LoginUser);

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token });

    } catch (err) {
        res.status(err.status || 500).json(err.errors || { message: "Server error" });
    }
};


module.exports = {
    register, login
}