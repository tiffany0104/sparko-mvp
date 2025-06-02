import { useEffect } from 'react';
import { supabase } from './supabaseClient';

function Auth() {
  useEffect(() => {
    const syncUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('id', user.id)
          .single();
        if (!data) {
          await supabase.from('Users').insert({
            id: user.id,
            full_name: user.user_metadata.full_name || user.email,
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
      }
    };
    syncUserProfile();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <h1 className="text-xl font-bold">Login Page (Placeholder)</h1>
    </div>
  );
}

export default Auth;