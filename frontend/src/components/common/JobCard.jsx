import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Building, BookmarkPlus, BookmarkCheck } from 'lucide-react';

const JobCard = ({ 
  job = {}, 
  isSaved = false,
  onSaveToggle = () => {},
  className = ''
}) => {
  const {
    id = '1',
    title = 'Software Engineer',
    company = 'Tech Company',
    location = 'Remote',
    salary = '$80,000 - $120,000',
    jobType = 'Full-time',
    postedDate = '2 days ago',
    logo = 'https://via.placeholder.com/50',
    companySize = '50-200 employees',
    isNew = false
  } = job;

  return (
    <div className={`
      relative overflow-hidden rounded-xl p-5
      bg-white/80 dark:bg-primary/40
      backdrop-blur-md backdrop-saturate-150
      border border-white/20 dark:border-white/10
      shadow-lg shadow-accent/5
      hover:shadow-accent/10 hover:scale-[1.01]
      transition-all duration-300
      ${className}
    `}>
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/20 dark:from-accent/5 dark:to-primary/5 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 dark:bg-primary-light flex items-center justify-center">
              {logo ? (
                <img src={logo} alt={`${company} logo`} className="h-full w-full object-cover" />
              ) : (
                <Building className="h-6 w-6 text-gray-400" />
              )}
            </div>
            
            <div>
              <Link to={`/jobs/${id}`}>
                <h3 className="font-semibold text-gray-900 dark:text-white hover:text-accent dark:hover:text-accent transition-colors">
                  {title}
                  {isNew && (
                    <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                      New
                    </span>
                  )}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300">{company}</p>
            </div>
          </div>
          
          <button 
            onClick={() => onSaveToggle(id)} 
            className="text-gray-400 hover:text-cta dark:hover:text-cta transition-colors"
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <BookmarkPlus className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-y-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Briefcase className="h-4 w-4 mr-1.5" />
            <span>{jobType}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Building className="h-4 w-4 mr-1.5" />
            <span>{companySize}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1.5" />
            <span>{postedDate}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm font-medium text-gray-900 dark:text-white">{salary}</div>
          <Link 
            to={`/jobs/${id}`}
            className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;