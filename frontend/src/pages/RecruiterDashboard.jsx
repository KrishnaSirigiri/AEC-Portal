import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import ApplicantList from "../components/ApplicantList";
import JobCardRecruiter from "../components/JobCardRecruiter";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch all jobs created by recruiter
  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      // filter jobs by recruiter (backend already restricts)
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">Recruiter Dashboard</h1>

      {selectedJob ? (
        <ApplicantList job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCardRecruiter
                key={job._id}
                job={job}
                onViewApplicants={() => setSelectedJob(job)}
              />
            ))
          ) : (
            <p>No jobs posted yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
