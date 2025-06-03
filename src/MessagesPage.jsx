import React from 'react';
import { useNavigate } from 'react-router-dom';

const sampleChats = [
  { id: '1', name: 'Diana Wu', idea: 'EdTech platform', lastMessage: 'Let’s chat soon!', pic: 'https://via.placeholder.com/80?text=Diana' },
  { id: '2', name: 'Ethan Brown', idea: 'Blockchain identity', lastMessage: 'Sounds great!', pic: 'https://via.placeholder.com/80?text=Ethan' }
];

export default function MessagesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F5F0] p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {sampleChats.map(chat => (
          <div key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)} className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 hover:scale-105 transition cursor-pointer">
            <img src={chat.pic} alt={chat.name} className="w-14 h-14 rounded-full object-cover" />
            <div>
              <h2 className="font-semibold">{chat.name}</h2>
              <p className="text-sm text-gray-600 italic">{chat.idea}</p>
              <p className="text-sm text-gray-800">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}