
import { useRouter } from 'next/router';
import { useUser } from '@/lib/useUser';
import MessageList from '@/components/Messages/MessageList';

export default function ChatPage() {
  const router = useRouter();
  const otherUserId = router.query.id as string;
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-xl font-semibold my-4 text-center">Chat</h1>
      <MessageList userId={user.id} otherUserId={otherUserId} />
    </div>
  );
}
