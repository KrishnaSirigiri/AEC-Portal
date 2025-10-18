import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import JobForm from "./JobForm";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      // Filter only jobs created by this recruiter
      const user = JSON.parse(localStorage.getItem("user"));
      const recruiterJobs = res.data.filter(
        (job) => job.createdBy === user._id
      );
      setJobs(recruiterJobs);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await API.delete(`/jobs/${id}`);
      fetchJobs();
    }
  };

  const handleSuccess = () => {
    setEditingJob(null);
    fetchJobs();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="recruiter-dashboard">
      <h2>Recruiter Dashboard</h2>
      <JobForm selectedJob={editingJob} onSuccess={handleSuccess} />
      <h3>Your Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs created yet</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h4>{job.title}</h4>
            <p>{job.company}</p>
            <p>{job.description}</p>
            <button onClick={() => setEditingJob(job)}>Edit</button>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecruiterDashboard;
