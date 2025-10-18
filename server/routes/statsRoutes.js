import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { adminOnly } from "../Middleware/adminMiddleware.js";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

// Admin only analytics (adjust if recruiters should also access)
router.get("/", protect(["admin"]), adminOnly, getStats);

export default router;


