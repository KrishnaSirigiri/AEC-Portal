export default function Contact() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold text-primary dark:text-white">Contact Us</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">We'd love to hear from you. Send us a message and we'll get back soon.</p>
        <form className="mt-6 space-y-4">
          <input className="w-full p-3 rounded-md border border-glass/30 bg-white/80 dark:bg-primary/70 text-gray-800 dark:text-white" placeholder="Your Name" />
          <input type="email" className="w-full p-3 rounded-md border border-glass/30 bg-white/80 dark:bg-primary/70 text-gray-800 dark:text-white" placeholder="Email" />
          <textarea rows="5" className="w-full p-3 rounded-md border border-glass/30 bg-white/80 dark:bg-primary/70 text-gray-800 dark:text-white" placeholder="Message" />
          <button className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-md">Send Message</button>
        </form>
      </div>
      <div className="p-6 rounded-xl bg-white/70 dark:bg-primary/70 backdrop-blur-md border border-glass/30 shadow">
        <h2 className="text-lg font-semibold text-primary dark:text-white">Office</h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">123 Construction Ave, Building 4, Suite 500, New York, NY 10001</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Phone: +1 (555) 123-4567</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Email: contact@aecjobs.com</p>
      </div>
    </div>
  );
}