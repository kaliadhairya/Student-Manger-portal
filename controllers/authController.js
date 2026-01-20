const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ username });
        if (user) return res.status(400).send("Username already exists");

        user = await User.findOne({ email });
        if (user) return res.status(400).send("Email already exists");

        if (!password || password.length < 4) {
            return res.status(400).send("Password must be at least 4 chars");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verified: true // Auto-verify for now as requested
        });

        await newUser.save();
        res.status(200).send("Registration successful!");

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(401).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.SECRET_KEY || 'this is my secret',
            { expiresIn: '1h' }
        );

        res.json({
            token,
            userProfile: {
                username: user.username,
                email: user.email
            },
            msg: "Login successful"
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
