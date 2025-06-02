import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from './supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (!data) {
          await supabase.from('Users').insert({
            id: session.user.id,
            full_name: session.user.user_metadata.full_name || session.user.email,
            startup_idea: '',
            skills: '',
            looking_for: '',
            profile_pic_url: '',
            super_spark: false
          });
          console.log('New user profile created in Users table');
        } else {
          console.log('User profile already exists');
        }
        navigate('/profile');  // 登入後自動導向個人資料頁
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center relative">
      <Link to="/" className="absolute top-4 left-4 text-xl font-bold text-orange-500">Sparko</Link>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Welcome to Sparko</h2>
        <Auth supabaseClient={supabase} appearance={{ style: { button: { backgroundColor: '#FFA500', color: '#fff' }, anchor: { color: '#FFA500' } } }} />
      </div>
    </div>
  );
}

export default AuthPage;