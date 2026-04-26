// server/routes/authRoutes.js

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// 🔥 AUTH ROUTES
router.post("/signup", authController.signup);
router.get("/verify", authController.verifyEmail);
router.post("/login", authController.login);

// 🔥 RESEND VERIFICATION (NEW)
router.post("/resend-verification", authController.resendVerification);

// 🔥 PASSWORD RESET
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;