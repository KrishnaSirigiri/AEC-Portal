import React, { useEffect, useState, useCallback } from "react";
import API from "../api/axiosConfig";

const ApplicantList = ({ job, onBack }) => {
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = useCallback(async () => {
    try {
      const res = await API.get(`/applications/applicants/${job._id}`);
      setApplicants(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [job._id]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status`, { status });
      fetchApplicants(); // refresh after update
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <button
        onClick={onBack}
        className="mb-4 text-blue-600 underline hover:text-blue-800"
      >
        ← Back to Jobs
      </button>
      <h2 className="text-xl font-semibold mb-4">
        Applicants for {job.title}
      </h2>

      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Resume</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((app) => (
              <tr key={app._id}>
                <td className="p-2 border">{app.applicant.name}</td>
                <td className="p-2 border">{app.applicant.email}</td>
                <td className="p-2 border">
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="p-2 border">{app.status}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => updateStatus(app._id, "Accepted")}
                    className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "Rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicantList;
