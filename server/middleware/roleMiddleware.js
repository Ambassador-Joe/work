//middleware/authorize.js
import User from "../models/User.js";

// Middleware for role-based authorization
export const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }

      // Check if the user's role matches any of the allowed roles
      if (!roles.includes(user.role)) {
        return res.status(403).json({ msg: "Unauthorized" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
