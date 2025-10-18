import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/jobs/${id}/apply`);
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !job) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error || 'Job not found'}
          </div>
          <div className="mt-6">
            <Button onClick={handleBack}>Back to Jobs</Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <div className="mb-6">
          <Button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
            ← Back to Jobs
          </Button>
        </div>
        
        {/* Job header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-1">{job.company}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.location}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {job.jobType}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleApply} className="w-full md:w-auto">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Job details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Salary Range</h2>
              <p className="mt-1 text-lg font-medium text-gray-900">{job.salaryRange || 'Not specified'}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Experience</h2>
              <p className="mt-1 text-lg font-medium text-gray-900">{job.experience || 'Not specified'}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Posted On</h2>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Job description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{job.description}</p>
          </div>
        </div>
        
        {/* Requirements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{job.requirements}</p>
          </div>
        </div>
        
        {/* Apply button (bottom) */}
        <div className="flex justify-center mt-8">
          <Button onClick={handleApply} className="px-8 py-3 text-lg">
            Apply for this Position
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetailsPage;