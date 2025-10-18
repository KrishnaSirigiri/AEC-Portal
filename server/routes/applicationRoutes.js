import express from "express";
import {
  applyJob,
  getApplicantsByJob,
  updateStatus,
  getMyApplications,
  deleteApplication, // ✅ newly added
} from "../controllers/applicationController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Job Seeker routes
router.post("/apply", protect, applyJob);
router.get("/my", protect, getMyApplications);
router.delete("/:id", protect, deleteApplication); // ✅ add here

// Recruiter routes
router.get("/applicants/:jobId", protect, getApplicantsByJob);
router.put("/:id/status", protect, updateStatus);

export default router;
