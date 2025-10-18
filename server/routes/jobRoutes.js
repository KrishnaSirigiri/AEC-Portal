import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", protect(["recruiter"]), createJob);
router.put("/:id", protect(["recruiter"]), updateJob);
router.delete("/:id", protect(["recruiter"]), deleteJob);

export default router;
