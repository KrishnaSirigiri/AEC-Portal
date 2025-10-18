import React from 'react';

const CareerResources = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">Career Resources</h1>
      <p className="text-gray-700 mb-6">Welcome to Career Resources — here are a few important topics to help you succeed in your job search:</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Resume & CV Tips</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Keep your resume concise and tailored to the role.</li>
          <li>Highlight measurable achievements and key skills relevant to AEC.</li>
          <li>Use clear section headings and consistent formatting.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Interview Preparation</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Research the company and prepare situational examples.</li>
          <li>Be ready to discuss technical knowledge and past projects.</li>
          <li>Prepare questions for the interviewer demonstrating interest.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Networking & Portfolio</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Maintain an up-to-date portfolio showcasing project work.</li>
          <li>Use platforms like LinkedIn to connect with recruiters and peers.</li>
          <li>Attend industry events and share your work publicly.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Career Growth</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Pursue certifications and continuous learning in relevant tools.</li>
          <li>Seek mentorship and volunteer for cross-functional projects.</li>
          <li>Set measurable goals and track progress periodically.</li>
        </ul>
      </section>
    </div>
  );
}

export default CareerResources;
