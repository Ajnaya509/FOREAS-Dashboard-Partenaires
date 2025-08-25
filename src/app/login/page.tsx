'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin@foreas.com' && password === 'foreas2024') {
      localStorage.setItem('foreas_auth', 'true');
      router.push('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 w-96">
        <h1 className="text-2xl font-bold text-white mb-6">FOREAS Partners</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-white/10 rounded-lg text-white"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-white/10 rounded-lg text-white"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="w-full p-3 bg-purple-600 rounded-lg text-white">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}