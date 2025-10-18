import { Link } from "react-router-dom";
import { Menu, X, Bell, Search } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth() || {};

  const dashboardPath = user?.role && user.role.toLowerCase() === "recruiter"
    ? "/recruiter-dashboard"
    : "/jobseeker-dashboard";

  return (
    <nav className="bg-[#071026] sticky top-0 z-50 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white">AEC</span>
            <span className="text-xl font-bold text-accent ml-2">Datadflo</span>
          </Link>
          <Link to="/" className="text-sm text-gray-200 bg-[#0e2540] px-3 py-2 rounded-md">Home</Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="w-2/5 relative">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full py-2 pl-10 pr-4 rounded-md bg-[#0b2036] text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <Search className="h-4 w-4 text-gray-300" />
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/notifications" className="relative p-2 rounded-full hover:bg-[#0e2540] transition-colors">
                <Bell className="text-gray-200" size={20} />
                <span className="absolute top-1 right-1 bg-cta w-2 h-2 rounded-full"></span>
              </Link>
              <Link 
                to={dashboardPath}
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-200 hover:text-white px-3 py-2">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Register</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={24} className="text-white"/> : <Menu size={24} className="text-white"/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 space-y-3 bg-[#071026] animate-fade-in">
          <div className="relative my-2">
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full py-2 pl-8 pr-4 rounded-md bg-[#0b2036] text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <div className="absolute left-2 top-2.5 text-gray-400">
              <Search className="h-4 w-4 text-gray-300" />
            </div>
          </div>
          
          <Link to="/jobs" onClick={() => setOpen(false)} className="text-gray-200 hover:text-accent transition-colors py-1">Jobs</Link>
          <Link to="/companies" onClick={() => setOpen(false)} className="text-gray-200 hover:text-accent transition-colors py-1">Companies</Link>
          
          {user ? (
            <>
              <Link to="/notifications" onClick={() => setOpen(false)} className="text-gray-200 hover:text-accent transition-colors py-1">Notifications</Link>
              <Link 
                to={dashboardPath}
                onClick={() => setOpen(false)}
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md transition-colors inline-block"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="text-gray-200 hover:text-accent transition-colors py-1">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-block">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
