
import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <div className="text-2xl font-bold text-orange-500">Sparko</div>
        <nav className="flex space-x-4">
          <a href="#products" className="text-gray-700 hover:text-orange-500">Products</a>
          <a href="#safety" className="text-gray-700 hover:text-orange-500">Safety</a>
        </nav>
        <a href="/login" className="text-white bg-orange-500 px-4 py-2 rounded">Login</a>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center p-8 bg-orange-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Startup Match</h1>
        <p className="text-lg text-gray-600 mb-6">Connect with driven co-founders, collaborators, and early believers across the globe</p>
        <a href="/signup" className="bg-orange-500 text-white px-6 py-3 rounded text-lg">Get Started</a>
      </section>

      {/* How Sparko Works */}
      <section className="p-8 bg-white" id="how">
        <h2 className="text-2xl font-bold mb-4">How Sparko Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Create Your Profile</strong>: Tell us who you are and what you’re building or looking for.</li>
          <li><strong>Browse & Connect</strong>: Explore potential co-founders, domain experts, or early supporters.</li>
          <li><strong>Spark a Match</strong>: Send a like or Spark (super interested) to show interest, and start building something great together.</li>
        </ol>
      </section>

      {/* Why Choose Sparko */}
      <section className="p-8 bg-orange-50" id="why">
        <h2 className="text-2xl font-bold mb-4">Why Choose Sparko?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Curated profiles of serious entrepreneurs & builders</li>
          <li>Global reach with local opportunities</li>
          <li>Spark-based matching system to find real chemistry</li>
          <li>Secure messaging & legal templates built-in</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-white text-center">
        &copy; {new Date().getFullYear()} Sparko. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
