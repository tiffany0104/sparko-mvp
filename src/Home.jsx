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

      <section className="text-center px-6 py-20 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">Find Your Perfect Startup Match</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">Connect with driven co-founders, collaborators, and early believers across the globe.</p>
        <Link to="/auth" className="bg-orange-400 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-500 transition">Get Started</Link>
      </section>

      <section className="p-8 md:p-12 bg-white" id="products">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">How Sparko Works</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 max-w-2xl mx-auto">
          <li><strong>Create Your Profile:</strong> Tell us who you are and what you’re building or looking for.</li>
          <li><strong>Browse & Connect:</strong> Explore potential co-founders, domain experts, or early supporters.</li>
          <li><strong>Spark a Match:</strong> Send a like or Spark (super interested) to show interest, and start building something great together.</li>
        </ol>
      </section>

      <section className="p-8 md:p-12 bg-orange-50" id="safety">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">Why Choose Sparko?</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700 max-w-2xl mx-auto">
          <li>Curated profiles of serious entrepreneurs & builders</li>
          <li>Global reach with local opportunities</li>
          <li>Spark-based matching system to find real chemistry</li>
          <li>Secure messaging & legal templates built-in</li>
        </ul>
      </section>

      <footer className="p-4 bg-white text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sparko. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;