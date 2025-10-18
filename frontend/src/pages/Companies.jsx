import { Building2, MapPin } from "lucide-react";

const companies = [
  { name: "Skylines Architects", location: "Tokyo, Japan", roles: 24 },
  { name: "Vertex Engineering", location: "New York, USA", roles: 18 },
  { name: "Futura Construction", location: "Dubai, UAE", roles: 12 },
  { name: "Nordic Structures", location: "Copenhagen, Denmark", roles: 8 },
];

export default function Companies() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary dark:text-white">Companies</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((c) => (
          <div key={c.name} className="p-6 rounded-xl bg-white/70 dark:bg-primary/70 backdrop-blur-md border border-glass/30 shadow">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-primary dark:text-white">{c.name}</h3>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <MapPin className="h-4 w-4" /> {c.location}
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">Open Roles: {c.roles}</p>
            <button className="mt-4 bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md">View Roles</button>
          </div>
        ))}
      </div>
    </div>
  );
}