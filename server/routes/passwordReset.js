//routes/passwordReset.js
import express from "express";
import { body } from "express-validator";
import { validateInputs } from "../middleware/validation.js";
import {
  requestPasswordReset,
  resetPassword,
} from "../controllers/passwordReset.js"; // Import password reset controllers

const router = express.Router();

// Request a password reset email
router.post(
  "/request-reset",
  [
    body("email").isEmail().withMessage("Invalid email address."),
  ],
  validateInputs,
  requestPasswordReset
);

// Reset password using a valid reset token
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required."),
    body("newPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  ],
  validateInputs,
  resetPassword
);

export default router;
