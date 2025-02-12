import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// ✅ REGISTER API
export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "Invalid fields entered" });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user
        await User.create({ fullName, email, password: hashedPassword });

        return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ LOGIN API
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Invalid fields entered" });
        }

        // ✅ Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // ✅ Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        // ✅ Set token in cookies
        const isProduction = process.env.NODE_ENV === "production";
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
            secure: isProduction, // ✅ Secure only in production
        });

        return res.status(200).json({ success: true, message: "User logged in successfully" });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ LOGOUT API
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        return res.status(200).json({ success: true, message: "User logged out successfully" });

    } catch (error) {
        console.error("Error logging out user:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
