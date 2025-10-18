import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar
} from "recharts";
import { Users, Briefcase, FileText, Activity } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="p-5 bg-white rounded-2xl shadow hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <Icon className={`text-${color}-600`} size={24} />
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </div>
  </div>
);

const DashboardAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("/api/stats", { withCredentials: true })
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <p className="text-center mt-10 text-gray-500">Loading analytics...</p>;

  const data = stats.weeklyApplications.map(a => ({
    date: a._id,
    applications: a.count,
  }));

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">📈 Analytics Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Users} title="Total Users" value={stats.totalUsers} color="indigo" />
        <StatCard icon={Briefcase} title="Total Jobs" value={stats.totalJobs} color="blue" />
        <StatCard icon={FileText} title="Applications" value={stats.totalApplications} color="green" />
        <StatCard icon={Activity} title="Recruiters" value={stats.totalRecruiters} color="purple" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">📅 Applications Per Day (Last Week)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#6366F1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">📊 Jobs vs Users</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: "Jobs", value: stats.totalJobs },
            { name: "Recruiters", value: stats.totalRecruiters },
            { name: "Job Seekers", value: stats.totalJobSeekers },
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
