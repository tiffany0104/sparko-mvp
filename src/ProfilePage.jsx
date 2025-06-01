import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePage() {
  return (
    <div className="bg-orange-50 min-h-screen p-6 flex flex-col items-center">
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-sm">
        <Link to="/" className="text-2xl font-bold text-orange-500">Sparko</Link>
        <button className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">Logout</button>
      </header>
      <div className="max-w-3xl w-full bg-white p-8 rounded shadow-md mt-8">
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100" alt="Profile" className="w-24 h-24 object-cover rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">Your Name</h2>
            <p className="text-gray-600">Startup Enthusiast | Co-founder</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link to="/edit-profile" className="bg-orange-100 text-orange-600 px-4 py-2 rounded hover:bg-orange-200 text-center">Edit Profile</Link>
          <Link to="/matching" className="bg-orange-100 text-orange-600 px-4 py-2 rounded hover:bg-orange-200 text-center">Start Matching</Link>
          <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded hover:bg-orange-200">My Feedback</button>
          <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded hover:bg-orange-200">Upgrade to Premium</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;