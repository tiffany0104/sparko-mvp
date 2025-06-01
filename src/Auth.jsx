import React, { useState } from 'react';
import { supabase } from './supabaseClient';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    let { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage(isLogin ? 'Login successful!' : 'Sign-up successful! Check your email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
          {isLogin ? 'Login to Sparko' : 'Create Your Sparko Account'}
        </h2>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded" />
          <button type="submit" className="w-full bg-orange-400 text-white py-2 rounded hover:bg-orange-500">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button className="text-orange-500 underline" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</button>
        </p>
      </div>
    </div>
  );
}

export default Auth;