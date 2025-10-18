import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * @desc Protect routes using JWT
 * @param {Array} roles - Optional roles allowed to access (e.g., ["admin"])
 */
export const protect = (roles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // Check if Bearer token is present
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, token missing" });
      }

      // Extract token
      const token = authHeader.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user in DB (excluding password)
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Role check (if provided)
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied for this role" });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
