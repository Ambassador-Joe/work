//middleware/validation.js
import { validationResult, body } from "express-validator";

export const validateInputs =[
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

(req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If validation errors exist, respond with a 400 Bad Request status and the error messages
    return res.status(400).json({ errors: errors.array() });
  }

  next();
},
];
