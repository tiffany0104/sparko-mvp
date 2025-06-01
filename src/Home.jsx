import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="font-sans bg-[#F9F5F0]">
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="text-2xl font-bold text-orange-500">Sparko</div>
        <nav className="flex space-x-6">
          <a href="#products" className="text-gray-800 hover:text-orange-500">Products</a>
          <a href="#safety" className="text-gray-800 hover:text-orange-500">Safety</a>
        </nav>
        <Link to="/auth" className="bg-orange-400 text-white px-4 py-2 rounded-full font-medium hover:bg-orange-500">Login</Link>
      </header>
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">Find Your Perfect Startup Match</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl">Connect with driven co-founders, collaborators, and early believers across the globe.</p>
        <a href="/signup" className="bg-orange-400 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-500 transition">Get Started</a>
      </section>
    </div>
  );
}

export default Home;