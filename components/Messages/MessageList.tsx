
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function MessageList({ userId, otherUserId }: { userId: string, otherUserId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('message-listen')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMsg = payload.new;
        if (
          (newMsg.sender_id === userId && newMsg.receiver_id === otherUserId) ||
          (newMsg.sender_id === otherUserId && newMsg.receiver_id === userId)
        ) {
          setMessages((prev) => [...prev, newMsg]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, otherUserId]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (!error) setMessages(data || []);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await supabase.from('messages').insert({
      sender_id: userId,
      receiver_id: otherUserId,
      content: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className="p-4">
      <div className="h-80 overflow-y-auto border rounded mb-2 bg-white p-2 shadow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-1 text-sm ${msg.sender_id === userId ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block px-3 py-1 rounded-xl ${
                msg.sender_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-spark-orange text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
