// server/controllers/authController.js

const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const {
  sendVerificationEmail,
  sendResetEmail
} = require("../services/emailService");

const config = require("../config");


// 🔥 SIGNUP (FINAL FIXED)
exports.signup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // ✅ NORMALIZE EMAIL
    email = email.trim().toLowerCase();

    let user = await User.findOne({ email });

    // 🔥 IF USER EXISTS
    if (user) {
      if (user.isVerified) {
        return res.status(400).json({
          error: "Email already registered. Please login."
        });
      }

      // 🔥 NOT VERIFIED → RESEND EMAIL
      const token = crypto.randomBytes(32).toString("hex");

      user.verificationToken = token;
      user.verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

      await user.save();
      await sendVerificationEmail(user, token);

      return res.status(200).json({
        message: "Account exists but not verified. Verification email resent."
      });
    }

    // 🔥 CREATE NEW USER
    const token = crypto.randomBytes(32).toString("hex");

    user = await User.create({
      name,
      email,
      password,
      verificationToken: token,
      verificationExpires: new Date(Date.now() + 60 * 60 * 1000)
    });

    await sendVerificationEmail(user, token);

    res.status(201).json({
      message: "Signup successful. Please verify your email."
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 VERIFY EMAIL (ROBUST)
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: "Token missing"
      });
    }

    // 🔥 FIND USER BY TOKEN ONLY
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        error: "Invalid token"
      });
    }

    // 🔥 CHECK EXPIRY
    if (user.verificationExpires < new Date()) {
      return res.status(400).json({
        error: "Token expired"
      });
    }

    // 🔥 SUCCESS
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;

    await user.save();

    res.json({
      message: "Email verified successfully"
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 RESEND VERIFICATION
exports.resendVerification = async (req, res, next) => {
  try {
    let { email } = req.body;

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        error: "User already verified"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.verificationToken = token;
    user.verificationExpires = new Date(Date.now() + 60 * 60 * 1000);

    await user.save();

    await sendVerificationEmail(user, token);

    res.json({
      message: "Verification email resent"
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 LOGIN
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        error: "Please verify your email before logging in"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      config.jwtSecret,
      { expiresIn: config.jwtExpiration }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
  try {
    let { email } = req.body;

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "No user found with this email"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);

    await user.save();

    await sendResetEmail(user, token);

    res.json({
      message: "Password reset link sent to your email"
    });

  } catch (err) {
    next(err);
  }
};


// 🔥 RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token
    });

    if (!user) {
      return res.status(400).json({
        error: "Invalid token"
      });
    }

    if (user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        error: "Token expired"
      });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (err) {
    next(err);
  }
};