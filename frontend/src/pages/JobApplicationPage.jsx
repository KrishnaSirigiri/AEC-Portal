import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Upload, 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Linkedin, 
  Globe, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Send,
  X
} from 'lucide-react';

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    coverLetter: '',
    coverLetterCharCount: 0,
    resume: null,
    linkedin: '',
    portfolio: '',
    availability: '',
    referral: ''
  });

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

    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status');
        if (!response.ok) {
          navigate(`/login?redirect=/jobs/${id}/apply`);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        navigate('/login');
      }
    };

    checkAuth();
    if (id) {
      fetchJobDetails();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    if (name === 'coverLetter') {
      updatedFormData.coverLetterCharCount = value.length;
    }
    
    setFormData(updatedFormData);
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('jobId', id);

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      navigate('/application-success', { 
        state: { 
          jobTitle: job?.title,
          company: job?.company
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(`/jobs/${id}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">Loading application form...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error && !job) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
              <div className="mt-6">
                <Button onClick={() => navigate('/jobs')} className="inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Apply for {job?.title} | AEC Job Portal</title>
        <meta name="description" content={`Submit your application for ${job?.title} at ${job?.company}`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 pb-12">
        {/* Application Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center mb-4">
              <button 
                onClick={handleBack} 
                className="inline-flex items-center text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full px-3 py-1 text-sm transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Job Details
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Apply for {job?.title}</h1>
                <div className="flex items-center mt-2">
                  <Building className="h-5 w-5 mr-2 text-indigo-200" />
                  <span className="text-lg text-indigo-100">{job?.company}</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job?.location || 'Remote'}
                  </div>
                  <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {job?.salaryRange || 'Competitive'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Application Status */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-green-800 font-medium">Application Submitted Successfully!</h3>
                <p className="text-green-700 mt-1">
                  Your application has been received. You can check the status in your dashboard.
                </p>
                <div className="mt-4">
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-red-800 font-medium">Error Submitting Application</h3>
                <p className="text-red-700 mt-1">{submitError}</p>
              </div>
            </div>
          )}
          
          {/* Application form */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Personal Information</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              
                {/* Resume Upload */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Resume</h2>
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="resume" className="relative cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:bg-indigo-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 py-2 px-4">
                          <span>Upload Resume</span>
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-3 pt-2">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                    </div>
                    {formData.resume && (
                      <div className="mt-4 p-3 bg-white rounded-md border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-indigo-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {formData.resume.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              
                {/* Cover Letter */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Cover Letter</h2>
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Why are you interested in this position? *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows={6}
                        required
                        maxLength={1000}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Explain why you're a good fit for this position and what makes you stand out from other candidates..."
                      ></textarea>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 flex justify-end">
                      {formData.coverLetterCharCount}/1000 characters
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Highlight your relevant skills and experience. Be concise and specific.
                    </p>
                  </div>
                </div>
              
                {/* Additional Information */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">Additional Information</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        name="portfolio"
                        id="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                        Earliest Start Date *
                      </label>
                      <input
                        type="date"
                        name="availability"
                        id="availability"
                        required
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">
                        How did you hear about us?
                      </label>
                      <select
                        name="referral"
                        id="referral"
                        value={formData.referral}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select an option</option>
                        <option value="job-board">Job Board</option>
                        <option value="company-website">Company Website</option>
                        <option value="referral">Employee Referral</option>
                        <option value="social-media">Social Media</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              
                {/* Submit Button */}
                <div className="pt-5 border-t">
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className={`inline-flex items-center ${submitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Application
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobApplicationPage;