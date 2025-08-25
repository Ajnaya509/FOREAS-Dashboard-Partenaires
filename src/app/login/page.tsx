'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Authentification factice sans vérification base de données
    setTimeout(() => {
      if (email === 'admin@foreas.com' && password === 'foreas2024') {
        localStorage.setItem('foreas_auth', 'true');
        router.push('/dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="dashboard-container min-h-screen flex items-center justify-center">
      {/* Animated Background Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center animate-pulse-glow">
              <span className="text-3xl font-bold text-white">F</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              FOREAS
            </h1>
            <p className="text-purple-300 text-sm mt-1">Dashboard Partenaires</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-purple-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="admin@foreas.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-300 text-sm font-medium mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                isLoading
                  ? 'bg-purple-600/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-purple-300 text-xs mb-2">🔑 Identifiants de démonstration :</p>
            <div className="space-y-1 text-xs">
              <p className="text-white">Email: <code className="bg-black/30 px-2 py-1 rounded">admin@foreas.com</code></p>
              <p className="text-white">Mot de passe: <code className="bg-black/30 px-2 py-1 rounded">foreas2024</code></p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-purple-300/60 text-xs">
            <p>© 2025 FOREAS - Accès sécurisé</p>
          </div>
        </div>
      </div>
    </div>
  );
}