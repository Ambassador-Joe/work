//controllers/passwordReset
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "../services/emailService.js"; // New email service

// Request a password reset email
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Generate a unique password reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send a password reset email to the user
    await sendPasswordResetEmail(user, resetToken);

    res.status(200).json({ msg: "Password reset email sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reset password using a valid reset token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify the reset token
    jwt.verify(token, process.env.RESET_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid or expired token." });
      }

      const user = await User.findById(decodedToken.id);

      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // Update the user's password
      user.password = passwordHash;
      await user.save();

      res.status(200).json({ msg: "Password reset successful." });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
