import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import { adminOnly } from "../Middleware/adminMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  getAllJobs,
  deleteJob,
  getAllApplications,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect(["admin"]), adminOnly, getAllUsers);
router.delete("/user/:id", protect(["admin"]), adminOnly, deleteUser);

router.get("/jobs", protect(["admin"]), adminOnly, getAllJobs);
router.delete("/job/:id", protect(["admin"]), adminOnly, deleteJob);

router.get("/applications", protect(["admin"]), adminOnly, getAllApplications);

export default router;


