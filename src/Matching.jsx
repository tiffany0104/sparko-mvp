import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

function Matching() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchSuccess, setMatchSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase.from('Users').select('*');
      if (!error) setCards(data);
    };
    fetchUsers();
  }, []);

  const handleSwipe = async (liked, isSuper = false) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || currentIndex >= cards.length) return;
    const target = cards[currentIndex];
    await supabase.from('Swipes').insert({ swiper_id: user.id, target_id: target.id, liked, super_spark: isSuper });
    if (liked && Math.random() > 0.5) {
      setMatchSuccess(true); confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => { setMatchSuccess(false); setCurrentIndex(prev => prev + 1); }, 3000);
    } else setCurrentIndex(prev => prev + 1);
  };

  if (!cards.length || currentIndex >= cards.length) return (
    <div className="text-center mt-10">No more profiles. Check back later!</div>
  );

  const p = cards[currentIndex], isSuper = p.super_spark;

  return (
    <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center p-4">
      <button onClick={() => navigate('/profile')} className="absolute top-4 left-4 bg-orange-400 text-white px-3 py-1 rounded">← Back</button>
      {matchSuccess && <div className="bg-yellow-100 p-4 rounded mb-4 text-center">🎉 You have unlocked a potential match!</div>}
      <div className={"bg-white p-6 rounded-lg shadow-lg w-full max-w-md transition transform duration-300 " + (isSuper ? "border-4 border-yellow-400 animate-pulse" : "")}>
        <img src={p.profile_pic_url} alt="Profile" className="w-full h-64 object-cover rounded mb-4"/>
        <h2 className="text-2xl font-bold text-orange-500">{p.full_name}</h2>
        <p><strong>About Me:</strong> {p.about_me}</p>
        <p><strong>Startup Idea:</strong> {p.startup_idea}</p>
        <p><strong>Skills:</strong> {p.skills}</p>
        <p><strong>Looking For:</strong> {p.looking_for}</p>
        <p><strong>Commitment Level:</strong> {p.commitment}</p>
        <div className="flex justify-between mt-4">
          <button onClick={() => handleSwipe(false)} className="bg-red-400 text-white px-4 py-2 rounded">Pass</button>
          <button onClick={() => handleSwipe(true, true)} className="bg-yellow-500 text-white px-4 py-2 rounded animate-bounce">🔥 Super Spark</button>
          <button onClick={() => handleSwipe(true)} className="bg-green-500 text-white px-4 py-2 rounded">Like</button>
        </div>
      </div>
    </div>
  );
}

export default Matching;