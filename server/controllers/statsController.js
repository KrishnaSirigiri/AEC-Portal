import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalJobSeekers = await User.countDocuments({ role: "jobseeker" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    const weeklyApplications = await Application.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalUsers,
      totalRecruiters,
      totalJobSeekers,
      totalJobs,
      totalApplications,
      weeklyApplications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching analytics data" });
  }
};


