import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { sendEmail } from "../utils/sendEmail.js";

// Apply to a job (JobSeeker only)
export const applyJob = async (req, res) => {
  try {
    const { jobId, resumeLink } = req.body;

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });
    if (alreadyApplied)
      return res.status(400).json({ message: "Already applied to this job" });

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      resumeLink,
    });
    // Notify recruiter via email + in-app notification
    const job = await Job.findById(jobId).populate("createdBy", "name email");
    if (job && job.createdBy) {
      const recruiter = job.createdBy;
      await Notification.create({
        userId: recruiter._id,
        message: `New application for ${job.title}`,
        type: "Application",
      });
      try {
        await sendEmail(
          recruiter.email,
          "New Job Application Received",
          `Hello ${recruiter.name},\n\nYou have received a new application for ${job.title}.\nPlease login to your dashboard to review the applicant details.`
        );
      } catch (e) {
        // log and continue; email failure shouldn't block the API
        console.error("Email send failed:", e.message);
      }
    }

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get applicants for a recruiter’s job
export const getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const applicants = await Application.find({ job: jobId }).populate(
      "applicant",
      "name email"
    );

    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update application status (Recruiter only)
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate("job");

    if (application.job.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    application.status = status;
    await application.save();

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get applications of a logged-in job seeker
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "title company salaryRange")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// In applicationController.js
export const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Not found" });
    if (app.applicant.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await app.deleteOne();
    res.json({ message: "Application withdrawn" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
