export default function Privacy() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-primary dark:text-white">Privacy Policy</h1>
      <p className="text-gray-700 dark:text-gray-300">Your privacy matters. We do not sell your data. We store only necessary information to provide our services.</p>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
        <li>Account information is securely stored.</li>
        <li>Analytics are anonymized.</li>
        <li>You can request data deletion anytime.</li>
      </ul>
    </div>
  );
}