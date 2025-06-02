import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import confetti from 'canvas-confetti';

function Matching() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchSuccess, setMatchSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const user = supabase.auth.user();
      console.log('Current User:', user);
      if (!user) {
        console.log('No user logged in.');
        return;
      }
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .neq('id', user.id);
      if (error) {
        console.log('Fetch error:', error);
      } else {
        console.log('Fetched Users:', data);
        setCards(data);
      }
    };
    fetchUsers();
  }, []);

  const handleSwipe = async (liked, isSuper = false) => {
    const user = supabase.auth.user();
    if (!user || currentIndex >= cards.length) return;
    const targetUser = cards[currentIndex];
    await supabase.from('Swipes').insert({
      swiper_id: user.id,
      target_id: targetUser.id,
      liked: liked,
      super_spark: isSuper
    });
    const isMatch = liked && Math.random() > 0.5;
    if (isMatch) {
      setMatchSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setMatchSuccess(false);
        setCurrentIndex(prev => prev + 1);
      }, 3000);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!cards.length || currentIndex >= cards.length) {
    return <div className="text-center mt-10">No more profiles. Check back later!</div>;
  }

  const profile = cards[currentIndex];
  const isSuperSpark = profile.super_spark;

  return (
    <div className="max-w-md mx-auto p-4">
      {matchSuccess && (
        <div className="text-center bg-yellow-100 p-4 rounded mb-4">
          🎉 You have unlocked a potential match!
        </div>
      )}
      <div className={"bg-white p-4 rounded shadow " + (isSuperSpark ? "border-4 border-yellow-400" : "")}>
        <img src={profile.profile_pic_url} alt="Profile" className="w-full h-64 object-cover rounded mb-2" />
        <h2 className="text-xl font-bold">{profile.full_name}</h2>
        <p>{profile.startup_idea}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Looking For:</strong> {profile.looking_for}</p>
        <div className="flex justify-between mt-4">
          <button onClick={() => handleSwipe(false)} className="bg-gray-300 text-black px-4 py-2 rounded">Pass</button>
          <button onClick={() => handleSwipe(true)} className="bg-orange-400 text-white px-4 py-2 rounded">Like</button>
          <button onClick={() => handleSwipe(true, true)} className="bg-red-500 text-white px-4 py-2 rounded">🔥 Super Spark</button>
        </div>
      </div>
    </div>
  );
}

export default Matching;