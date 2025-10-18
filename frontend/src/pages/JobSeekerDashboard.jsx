import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your applications...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <p>You haven’t applied for any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-1">{app.job?.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                {app.job?.company || "Unknown Company"}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Salary: {app.job?.salaryRange || "N/A"}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    app.status === "Accepted"
                      ? "text-green-600"
                      : app.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {app.status}
                </span>
              </p>
              <a
                href={app.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-600 underline text-sm"
              >
                View Submitted Resume
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
