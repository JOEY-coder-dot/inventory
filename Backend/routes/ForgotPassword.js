const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendResetEmail } = require("../services/emailService");
const User = require("../models/user");

const router = express.Router();

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    console.log("ForgotPassword request for:", email);

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save token + expiry
    await User.saveResetToken(email, resetToken, expiry);

    // Send reset email
    await sendResetEmail(email, resetToken);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("ForgotPassword error:", err.message, err.stack);
    res.status(500).json({ message: "Server error" });
  }
});

// Reset Password Route
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    console.log("ResetPassword request with token:", token);

    const user = await User.findByResetToken(token);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Check expiry
    if (new Date(user.reset_token_expiry) < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await User.updatePassword(user.id, hashedPassword);

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    console.error("ResetPassword error:", err.message, err.stack);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;