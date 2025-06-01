import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: '',
    about_me: '',
    skills: '',
    startup_idea: '',
    looking_for: 'Co-founder',
    commitment_level: 'Side Project',
    contact_info: '',
    linkedin: '',
    profile_pic_url: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = supabase.auth.user();
      if (!user) return;
      const { data } = await supabase.from('Users').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const filePath = `${supabase.auth.user().id}/${file.name}`;
    await supabase.storage.from('profile-pictures').upload(filePath, file);
    const { publicURL } = supabase.storage.from('profile-pictures').getPublicUrl(filePath).data;
    setProfile({ ...profile, profile_pic_url: publicURL });
  };

  const handleSave = async () => {
    const user = supabase.auth.user();
    if (!user) return;
    await supabase.from('Users').upsert({ ...profile, id: user.id });
    navigate('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <Link to="/profile" className="text-orange-500 underline mb-4 block">← Back to Profile</Link>
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Edit Your Profile</h1>
      <input type="file" onChange={handleImageUpload} className="mb-2" />
      <label>Full Name</label>
      <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Enter your full name" className="w-full p-2 mb-2 border rounded" />
      <label>About Me</label>
      <textarea value={profile.about_me} onChange={(e) => setProfile({ ...profile, about_me: e.target.value })} placeholder="Tell us about yourself" className="w-full p-2 mb-2 border rounded" />
      <label>Skills</label>
      <input value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="Your skills (comma-separated)" className="w-full p-2 mb-2 border rounded" />
      <label>Startup Idea</label>
      <input value={profile.startup_idea} onChange={(e) => setProfile({ ...profile, startup_idea: e.target.value })} placeholder="Brief startup idea" className="w-full p-2 mb-2 border rounded" />
      <label>Looking For</label>
      <select value={profile.looking_for} onChange={(e) => setProfile({ ...profile, looking_for: e.target.value })} className="w-full p-2 mb-2 border rounded">
        <option>Co-founder</option>
        <option>Investor</option>
        <option>Exploring</option>
      </select>
      <label>Commitment Level</label>
      <select value={profile.commitment_level} onChange={(e) => setProfile({ ...profile, commitment_level: e.target.value })} className="w-full p-2 mb-2 border rounded">
        <option>Side Project</option>
        <option>Full-time</option>
        <option>Exploring</option>
      </select>
      <label>Contact Info (Private)</label>
      <input value={profile.contact_info} onChange={(e) => setProfile({ ...profile, contact_info: e.target.value })} placeholder="Your contact info" className="w-full p-2 mb-2 border rounded" />
      <label>LinkedIn (Private)</label>
      <input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="LinkedIn profile URL" className="w-full p-2 mb-2 border rounded" />
      <div className="flex justify-between mt-4">
        <button onClick={handleSave} className="bg-orange-400 text-white px-4 py-2 rounded">Save</button>
        <Link to="/profile" className="bg-gray-300 text-black px-4 py-2 rounded">Preview</Link>
      </div>
    </div>
  );
}

export default EditProfile;