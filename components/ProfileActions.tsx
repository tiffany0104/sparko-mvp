
import { useRouter } from 'next/router';
import { useUser } from '@/lib/useUser';

export default function ProfileActions({ profileId }: { profileId: string }) {
  const router = useRouter();
  const { user } = useUser();

  const handleSendMessage = () => {
    router.push(`/messages/${profileId}`);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm">
        Start Matching
      </button>
      <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl text-sm">
        Edit Profile
      </button>
      <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-sm">
        My Feedback
      </button>
      {user?.id !== profileId && (
        <button
          onClick={handleSendMessage}
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm"
        >
          💬 Send Message
        </button>
      )}
    </div>
  );
}
