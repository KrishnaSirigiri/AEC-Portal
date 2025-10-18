import { Link } from "react-router-dom";
import { Menu, X, Bell, Search } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth() || {};

  return (
    <nav className="bg-white dark:bg-primary sticky top-0 z-50 shadow-sm dark:shadow-accent/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary dark:text-white">AEC</span>
          <span className="text-xl font-bold text-accent">Datadflo</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="py-2 pl-8 pr-4 rounded-md bg-gray-100 dark:bg-primary-light text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent w-48 transition-all duration-200"
            />
            <div className="absolute left-2 top-2.5 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors">Home</Link>
          <Link to="/jobs" className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors">Jobs</Link>
          <Link to="/companies" className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors">Companies</Link>
          
          <ThemeToggle />
          
          {user ? (
            <>
              <Link to="/notifications" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-light transition-colors">
                <Bell className="text-gray-700 dark:text-gray-200" size={20} />
                <span className="absolute top-1 right-1 bg-cta w-2 h-2 rounded-full"></span>
              </Link>
              <Link 
                to={user.role === "Recruiter" ? "/recruiter-dashboard" : "/jobseeker-dashboard"} 
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors">Login</Link>
              <Link to="/register" className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} className="text-gray-700 dark:text-white"/> : <Menu size={24} className="text-gray-700 dark:text-white"/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 bg-white dark:bg-primary-light animate-fade-in">
          <div className="relative my-2">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full py-2 pl-8 pr-4 rounded-md bg-gray-100 dark:bg-primary text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <div className="absolute left-2 top-2.5 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>
          
          <Link to="/jobs" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors py-1">Jobs</Link>
          <Link to="/companies" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors py-1">Companies</Link>
          
          {user ? (
            <>
              <Link to="/notifications" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors py-1">Notifications</Link>
              <Link 
                to={user.role === "Recruiter" ? "/recruiter-dashboard" : "/jobseeker-dashboard"} 
                onClick={() => setOpen(false)}
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors inline-block"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors py-1">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors inline-block">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
