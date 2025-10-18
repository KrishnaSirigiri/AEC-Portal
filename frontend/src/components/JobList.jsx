import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';

const sampleJobs = [
  {
    _id: 'sample-1',
    title: 'Junior Architect',
    company: 'Skyline Studio',
    description: 'Assist in design development and BIM documentation for mixed-use projects.',
    salaryRange: '$45k - $60k',
    skills: ['AutoCAD', 'Revit', 'SketchUp'],
  },
  {
    _id: 'sample-2',
    title: 'Structural Engineer',
    company: 'Tokyo Build Co.',
    description: 'Analyze structures and collaborate on high-rise developments in Tokyo.',
    salaryRange: '$70k - $95k',
    skills: ['ETABS', 'SAP2000', 'Finite Element Analysis'],
  },
  {
    _id: 'sample-3',
    title: 'Construction Project Manager',
    company: 'UrbanWorks',
    description: 'Lead schedules, budgets, and cross-functional teams for metropolitan projects.',
    salaryRange: '$90k - $120k',
    skills: ['Scheduling', 'Contracts', 'Stakeholder Management'],
  },
];

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const useSampleData = () => {
    setJobs(sampleJobs);
    setError('');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-6">
        <div className="animate-pulse grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg bg-white/70 dark:bg-primary/70 border border-glass/30 h-32" />
          <div className="p-4 rounded-lg bg-white/70 dark:bg-primary/70 border border-glass/30 h-32" />
          <div className="p-4 rounded-lg bg-white/70 dark:bg-primary/70 border border-glass/30 h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-8 p-6 rounded-xl bg-white/80 dark:bg-primary/70 border border-glass/30 shadow">
        <h2 className="text-xl font-semibold text-primary dark:text-white">We couldn’t load jobs right now</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Please check your connection or try again. You can also preview sample jobs.</p>
        <div className="mt-4 flex gap-3">
          <button onClick={fetchJobs} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md">Retry</button>
          <button onClick={useSampleData} className="bg-primary/10 hover:bg-primary/20 text-primary dark:text-white px-4 py-2 rounded-md border border-glass/30">View sample jobs</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-primary dark:text-white">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="mt-2 text-gray-700 dark:text-gray-300">No jobs found</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {jobs.map(job => (
            <div key={job._id} className="job-card p-5 rounded-lg bg-white/80 dark:bg-primary/70 border border-glass/30 shadow">
              <h3 className="text-lg font-semibold text-primary dark:text-white">{job.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{job.company}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{job.description}</p>
              <p className="mt-2 text-sm"><strong>Salary:</strong> {job.salaryRange}</p>
              <p className="mt-1 text-sm"><strong>Skills:</strong> {job.skills?.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
