import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const [showSearchPopup, setShowSearchPopup] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const location = useLocation();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get('/jobs');
        setJobs(res.data);
      } catch (err) {
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('search') === 'true') {
      setShowSearchPopup(true);
    }
  }, [location.search]);

  const performSearch = async (term) => {
    setSearchLoading(true);
    try {
      const res = await API.get(`/jobs?q=${encodeURIComponent(term)}&limit=20`);
      setSearchResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading jobs...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Job Openings</h2>
      </div>
      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <div key={job._id} className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                <span className="text-xs text-gray-500">{job.location || 'Location N/A'}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3">{job.description}</p>
              <p className="text-sm text-gray-700 mb-1"><strong>Salary:</strong> {job.salaryRange || 'N/A'}</p>
              <p className="text-sm text-gray-700 mb-4"><strong>Skills:</strong> {job.skillsRequired?.join(', ') || 'N/A'}</p>
              <div className="flex justify-between items-center">
                <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:text-blue-700 font-medium">View Details</Link>
                <Link to={`/jobs/${job._id}/apply`} className="bg-accent hover:bg-accent-dark text-white px-3 py-1.5 rounded-md text-sm">Apply</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {showSearchPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-6 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Search jobs</h3>
              <button onClick={() => setShowSearchPopup(false)} className="text-gray-500">Close</button>
            </div>
            <div className="mb-4 flex gap-3">
              <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search by title, company, skills" className="flex-1 border p-2 rounded" />
              <button onClick={() => performSearch(searchTerm)} className="bg-accent text-white px-4 py-2 rounded">Search</button>
            </div>
            <div>
              {searchLoading ? (
                <p>Searching...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.length === 0 ? (
                    <p className="text-gray-600">No results</p>
                  ) : (
                    searchResults.map(job => (
                      <div key={job._id} className="p-3 border rounded">
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                        <div className="mt-2">
                          <Link to={`/jobs/${job._id}`} className="text-blue-600">View</Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
