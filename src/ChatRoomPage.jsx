import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyMessages = [
  { id: 1, sender: 'me', content: 'Hi there! Let’s build something great.' },
  { id: 2, sender: 'them', content: 'Absolutely! Excited to connect with you!' }
];

export default function ChatRoomPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'me', content: input }]);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#F9F5F0]">
      <div className="flex items-center p-4 bg-white shadow">
        <button onClick={() => navigate('/messages')} className="mr-4 text-orange-500 font-bold">← Back</button>
        <h2 className="text-xl font-semibold">Chat with Diana</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`max-w-xs p-3 rounded-2xl ${m.sender === 'me' ? 'ml-auto bg-[#FFE5B4] rounded-br-none' : 'bg-white rounded-bl-none'}`}>
            <p>{m.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-4 bg-white flex items-center space-x-2 shadow">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type your message..." className="flex-1 p-2 rounded border border-gray-300" />
        <button onClick={sendMessage} className="bg-orange-400 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}