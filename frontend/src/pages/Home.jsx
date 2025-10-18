import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="min-h-[60vh] bg-[#0b1220] p-6">
      <div className="max-w-6xl mx-auto py-12">
        <div className="bg-[#071026] rounded-xl shadow-lg p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">Find your next role in AEC</h1>
          <p className="text-gray-300 mb-6">Search curated jobs from top architecture, engineering and construction companies.</p>

          <div className="flex gap-3 items-center">
            <input type="text" placeholder="Search jobs..." className="flex-1 py-3 px-4 rounded-md bg-[#0b2036] text-gray-200 focus:outline-none" />
            <button className="bg-accent text-white px-5 py-3 rounded-md">Search</button>
            <Link to="/login" className="ml-4 px-4 py-3 border rounded-md bg-transparent text-white border-gray-600">Login</Link>
            <Link to="/register" className="ml-2 px-4 py-3 rounded-md bg-blue-600 text-white">Register</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
