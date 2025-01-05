import User from '../models/user.model.js'; // Ensure you import your User model

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

        const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email,
            password,
            username,
            profilePic: image
        });

        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
}

export async function login(req, res) {
    res.send("Login route");
}

export async function logout(req, res) {
    res.send("Logout route");
}