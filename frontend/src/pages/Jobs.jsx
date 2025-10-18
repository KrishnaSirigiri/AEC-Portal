import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, DollarSign } from 'lucide-react';
import JobCard from '../components/common/JobCard';
import MainLayout from '../layouts/MainLayout';

// Mock data for jobs
const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    postedDate: '2 days ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '50-200 employees',
    isNew: true
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    salary: '$75,000 - $95,000',
    jobType: 'Full-time',
    postedDate: '1 week ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '10-50 employees',
    isNew: false
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'San Francisco, CA',
    salary: '$100,000 - $130,000',
    jobType: 'Full-time',
    postedDate: '3 days ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '200-500 employees',
    isNew: true
  },
  {
    id: '4',
    title: 'DevOps Specialist',
    company: 'CloudTech',
    location: 'Remote',
    salary: '$85,000 - $115,000',
    jobType: 'Contract',
    postedDate: '5 days ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '50-200 employees',
    isNew: false
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'InnovateCo',
    location: 'Austin, TX',
    salary: '$95,000 - $125,000',
    jobType: 'Full-time',
    postedDate: '1 day ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '100-300 employees',
    isNew: true
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    location: 'Boston, MA',
    salary: '$90,000 - $120,000',
    jobType: 'Full-time',
    postedDate: '1 week ago',
    logo: 'https://via.placeholder.com/50',
    companySize: '50-200 employees',
    isNew: false
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSaveToggle = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
            Find Your Dream Job
          </h1>
          
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-lg 
                  bg-white dark:bg-primary-light 
                  text-gray-800 dark:text-white 
                  border border-gray-200 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2.5 rounded-lg bg-white dark:bg-primary-light border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-primary transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-8 p-4 rounded-xl bg-white/80 dark:bg-primary/40 backdrop-blur-md border border-white/20 dark:border-white/10 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <div className="relative">
                  <select className="w-full p-2 pl-9 rounded-md bg-white dark:bg-primary-light border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white appearance-none">
                    <option value="">Any Location</option>
                    <option value="remote">Remote</option>
                    <option value="new-york">New York, NY</option>
                    <option value="san-francisco">San Francisco, CA</option>
                    <option value="austin">Austin, TX</option>
                  </select>
                  <div className="absolute left-2.5 top-2.5 text-gray-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                <div className="relative">
                  <select className="w-full p-2 pl-9 rounded-md bg-white dark:bg-primary-light border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white appearance-none">
                    <option value="">Any Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                  <div className="absolute left-2.5 top-2.5 text-gray-400">
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salary Range</label>
                <div className="relative">
                  <select className="w-full p-2 pl-9 rounded-md bg-white dark:bg-primary-light border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white appearance-none">
                    <option value="">Any Salary</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-80000">$50,000 - $80,000</option>
                    <option value="80000-120000">$80,000 - $120,000</option>
                    <option value="120000+">$120,000+</option>
                  </select>
                  <div className="absolute left-2.5 top-2.5 text-gray-400">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                isSaved={savedJobs.includes(job.id)}
                onSaveToggle={handleSaveToggle}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">No jobs found matching your search criteria.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 text-accent hover:text-accent-dark transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Jobs;