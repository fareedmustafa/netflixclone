// filepath: /c:/Users/Fareed/Desktop/netflix application/backend/controllers/auth.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "Please enter all fields" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "User with this username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            profilePic: image
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
}

export async function login(req, res) {
try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter all fields" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ success: false, message: "INVALID CREDENTIALS" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ success: false, message: "INVALID CREDENTIALS" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
        success: true,
        user: {
            ...user._doc,
            password: "",
        }
    });
} catch (error) {
    res.status(500).json({ success: false, message: "Error logging in", error: error.message });
}

}

export async function logout(req, res) {
try{
res.clearCookie("jwt-netflix");
res.status(200).json({ success: true, message: "Logged out successfully" });
}
catch(error){
    console.log("Error logging out: " + error.message);
}
}