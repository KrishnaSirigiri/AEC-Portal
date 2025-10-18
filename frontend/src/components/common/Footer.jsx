import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#071026] text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section with logo and description */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">AEC</span>
              <span className="text-xl font-bold text-accent">Datadflo</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Connecting top talent with leading companies in the Architecture,
              Engineering, and Construction industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link to="/jobs" className="hover:text-accent transition-colors">Browse Jobs</Link>
                </li>
                <li>
                  <Link to="/companies" className="hover:text-accent transition-colors">Companies</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                </li>
            </ul>
          </div>

          {/* For Job Seekers */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase mb-4">FOR JOB SEEKERS</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/register" className="hover:text-accent transition-colors">Create Account</Link>
              </li>
              <li>
                <Link to="/jobseeker-dashboard" className="hover:text-accent transition-colors">Job Seeker Dashboard</Link>
              </li>
              <li>
                <Link to="/jobs?search=true" className="hover:text-accent transition-colors">Search Jobs</Link>
              </li>
              <li>
                <Link to="/career-resources" className="hover:text-accent transition-colors">Career Resources</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase mb-4">CONTACT US</h3>
            <address className="text-sm text-gray-300 not-italic">
              <p className="mb-2">123 Construction Ave, Building 4,</p>
              <p className="mb-2">Suite 500, New York, NY 10001</p>
              <p className="mb-2">
                <a href="tel:+1(555)123-4567" className="hover:text-accent transition-colors">+1 (555) 123-4567</a>
              </p>
              <p>
                <a href="mailto:contact@aecjobs.com" className="hover:text-accent transition-colors">contact@aecjobs.com</a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 AEC Job Portal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="hover:text-accent transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );

};

export default Footer;


