import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Auth from './Auth';
import ProfilePage from './ProfilePage';

const EditProfile = () => <div>Edit Profile Page (Coming Soon)</div>;
const Matching = () => <div>Matching Page (Coming Soon)</div>;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/matching" element={<Matching />} />
      </Routes>
    </Router>
  </React.StrictMode>
);