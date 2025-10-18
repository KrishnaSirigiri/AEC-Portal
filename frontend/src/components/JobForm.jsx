import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

const JobForm = ({ selectedJob, onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    salaryRange: "",
    skills: "",
  });

  useEffect(() => {
    if (selectedJob) {
      setForm({
        title: selectedJob.title,
        description: selectedJob.description,
        company: selectedJob.company,
        salaryRange: selectedJob.salaryRange,
        skills: selectedJob.skills.join(", "),
      });
    }
  }, [selectedJob]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };

    try {
      if (selectedJob) {
        await API.put(`/jobs/${selectedJob._id}`, payload);
      } else {
        await API.post("/jobs", payload);
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving job", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <input
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="salaryRange"
        placeholder="Salary Range"
        value={form.salaryRange}
        onChange={handleChange}
      />
      <input
        name="skills"
        placeholder="Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
      />
      <button type="submit">{selectedJob ? "Update Job" : "Create Job"}</button>
    </form>
  );
};

export default JobForm;
