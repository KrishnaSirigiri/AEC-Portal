import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, refreshToken, logout } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login existing user
router.post("/login", loginUser);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Tokens
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

export default router;
