import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function Matching() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from('Users').select('*');
      setCards(data);
    };
    fetchUsers();
  }, []);

  const handleSwipe = async (liked) => {
    const user = supabase.auth.user();
    if (!user || currentIndex >= cards.length) return;
    const targetUser = cards[currentIndex];
    await supabase.from('Swipes').insert({
      swiper_id: user.id,
      target_id: targetUser.id,
      liked: liked
    });
    setCurrentIndex((prev) => prev + 1);
  };

  if (!cards.length || currentIndex >= cards.length) {
    return <div className="text-center mt-10">No more profiles. Check back later!</div>;
  }

  const profile = cards[currentIndex];

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white p-4 rounded shadow">
        <img src={profile.profile_pic_url} alt="Profile" className="w-full h-64 object-cover rounded mb-2" />
        <h2 className="text-xl font-bold">{profile.full_name}</h2>
        <p>{profile.startup_idea}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Looking For:</strong> {profile.looking_for}</p>
        <div className="flex justify-between mt-4">
          <button onClick={() => handleSwipe(false)} className="bg-gray-300 text-black px-4 py-2 rounded">Pass</button>
          <button onClick={() => handleSwipe(true)} className="bg-orange-400 text-white px-4 py-2 rounded">Like</button>
          <button onClick={() => handleSwipe(true)} className="bg-red-500 text-white px-4 py-2 rounded">Super Spark</button>
        </div>
      </div>
    </div>
  );
}

export default Matching;