import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';

function AuthPage() {
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
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  );
}

export default AuthPage;