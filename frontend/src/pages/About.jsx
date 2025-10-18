export default function About() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary dark:text-white">About Us</h1>
      <p className="text-gray-700 dark:text-gray-300">
        We connect top talent with visionary AEC companies. Our mission is to build better cities and a better future.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {["Integrity", "Innovation", "Impact"].map((v) => (
          <div key={v} className="p-6 rounded-xl bg-white/70 dark:bg-primary/70 backdrop-blur-md border border-glass/30 shadow">
            <h3 className="text-lg font-semibold text-primary dark:text-white">{v}</h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">We strive to bring {v.toLowerCase()} to every step of the hiring process.</p>
          </div>
        ))}
      </div>
    </div>
  );
}