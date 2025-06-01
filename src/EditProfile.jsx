import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    full_name: '',
    about_me: '',
    skills: '',
    startup_idea: '',
    looking_for: '',
    commitment_level: '',
    contact_info: '',
    linkedin: '',
    profile_pic_url: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');

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
      <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Edit Your Profile</h1>
      <input type="file" onChange={handleImageUpload} className="mb-2" />
      <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Full Name" className="w-full p-2 mb-2 border rounded" />
      <textarea value={profile.about_me} onChange={(e) => setProfile({ ...profile, about_me: e.target.value })} placeholder="About Me" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} placeholder="Skills" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.startup_idea} onChange={(e) => setProfile({ ...profile, startup_idea: e.target.value })} placeholder="Startup Idea" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.looking_for} onChange={(e) => setProfile({ ...profile, looking_for: e.target.value })} placeholder="Looking For" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.commitment_level} onChange={(e) => setProfile({ ...profile, commitment_level: e.target.value })} placeholder="Commitment Level" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.contact_info} onChange={(e) => setProfile({ ...profile, contact_info: e.target.value })} placeholder="Contact Info (Private)" className="w-full p-2 mb-2 border rounded" />
      <input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="LinkedIn (Private)" className="w-full p-2 mb-2 border rounded" />
      <button onClick={handleSave} className="bg-orange-400 text-white px-4 py-2 rounded mt-4 w-full">Save</button>
    </div>
  );
}

export default EditProfile;