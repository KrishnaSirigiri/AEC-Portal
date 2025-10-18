import Job from "../models/Job.js";

// @desc Create new job
// @route POST /api/jobs
// @access Recruiter only
export const createJob = async (req, res) => {
  try {

    console.log("Request received for creating job");  // add this
    console.log("User from token:", req.user);         // add this
    console.log("Body:", req.body);               // add this
    
    const { title, description, company, location, salaryRange, skillsRequired } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salaryRange,
      skillsRequired,
      createdBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all jobs
// @route GET /api/jobs
// @access Public
export const getJobs = async (req, res) => {
  try {
    // default limit
    const maxLimit = 20;
    let limit = parseInt(req.query.limit, 10) || maxLimit;
    if (limit > maxLimit) limit = maxLimit;

    // server-side search: support ?q=term
    const { q } = req.query;
    let filter = {};
    if (q && q.trim().length > 0) {
      const term = q.trim();
      filter = {
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { company: { $regex: term, $options: 'i' } },
          { location: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } },
          { skillsRequired: { $elemMatch: { $regex: term, $options: 'i' } } },
        ],
      };
    }

    // return newest jobs first, limited to `limit`
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("createdBy", "name email role");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single job by ID
// @route GET /api/jobs/:id
// @access Public
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy", "name email role");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update job
// @route PUT /api/jobs/:id
// @access Recruiter only
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only the recruiter who created the job can edit it
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete job
// @route DELETE /api/jobs/:id
// @access Recruiter only
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Only the recruiter who created the job can delete it
    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
