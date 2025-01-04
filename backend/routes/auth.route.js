import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router(); // Correct the Router initialization

// Define routes
router.post("/signup", signup); // Use POST for signup
router.post("/login", login);  // Use POST for login
router.get("/logout", logout); // Logout can remain GET

export default router;
