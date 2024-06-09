const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.checkEmail = async (req, res) => {
    const { email } = req.query;
    console.log("Check email request received:", email);

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password, age } = req.body;
    console.log("Register request received:", req.body);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 0709814 (ok)
    // Assurez-vous que age a une valeur par défaut s'il est vide
    const ageValue = age ? parseInt(age, 10) : 0;

=======
>>>>>>> parent of 385feb2 (update)
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request received:", req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Invalid credentials");
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
};