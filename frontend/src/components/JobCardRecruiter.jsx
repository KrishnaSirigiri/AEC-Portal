import React from "react";

const JobCardRecruiter = ({ job, onViewApplicants }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold">{job.title}</h2>
      <p className="text-sm text-gray-600">{job.company}</p>
      <p className="text-sm mt-2">{job.description}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Applicants: {job.applicantCount || 0}
        </p>
        <button
          onClick={onViewApplicants}
          className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View Applicants
        </button>
      </div>
    </div>
  );
};

export default JobCardRecruiter;
