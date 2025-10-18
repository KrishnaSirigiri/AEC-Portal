import { Link } from "react-router-dom";
import { Building2, MapPin, Globe, Briefcase, Users } from "lucide-react";

const features = [
  { icon: Building2, title: "Top AEC Firms", desc: "Discover leading Architecture, Engineering, and Construction companies." },
  { icon: MapPin, title: "Iconic Locations", desc: "Explore roles in landmark cities and projects worldwide." },
  { icon: Globe, title: "Global Opportunities", desc: "Find roles in world-class cities from Tokyo to NYC." },
  { icon: Briefcase, title: "Tailored Jobs", desc: "Get matched to roles based on your skills and preferences." },
  { icon: Users, title: "Recruiter Access", desc: "Manage postings, applications, and teams effectively." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-primary-light">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl p-8 md:p-14 bg-white/80 dark:bg-primary/60 backdrop-blur-xl shadow-xl border border-glass/30">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-cta/10" />
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-primary dark:text-white tracking-tight">
            Build Your Career in Architecture, Engineering & Construction
          </h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Join top AEC companies and work on iconic projects from Tokyo high-rises to futuristic smart cities.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/jobs" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md shadow">
              Browse Jobs
            </Link>
            <Link to="/register" className="bg-cta hover:bg-cta/80 text-white px-6 py-3 rounded-md shadow">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => (
          <div key={idx} className="group p-6 rounded-xl bg-white/70 dark:bg-primary/70 backdrop-blur-md border border-glass/30 shadow transition-transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <f.icon className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-primary dark:text-white">{f.title}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="mt-12 rounded-xl p-8 bg-gradient-to-r from-primary to-primary-light text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Ready to shape skylines and build the future?</h2>
            <p className="text-sm text-white/80">Create your profile, get matched, and apply in minutes.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/register" className="bg-white text-primary px-5 py-2 rounded-md font-medium">Create Account</Link>
            <Link to="/companies" className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-md">Explore Companies</Link>
          </div>
        </div>
      </section>
    </div>
  );
}