'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Base de données fictive des partenaires
const PARTNERS_DB = [
  { email: 'dupont@location.fr', password: 'dupont2024', name: 'Agence Dupont Location', drivers: 42 },
  { email: 'formation@vtc.fr', password: 'vtc2024', name: 'Centre Formation VTC Paris', drivers: 28 },
  { email: 'elite@cars.fr', password: 'elite2024', name: 'Elite Cars Services', drivers: 67 },
  { email: 'test@foreas.com', password: 'test2024', name: 'Partenaire Test', drivers: 15 }
];

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérifier dans la "base de données"
    const partner = PARTNERS_DB.find(
      p => p.email === email && p.password === password
    );

    if (partner) {
      // Stocker les infos du partenaire
      localStorage.setItem('foreas_auth', 'true');
      localStorage.setItem('partner_data', JSON.stringify({
        name: partner.name,
        email: partner.email,
        drivers: partner.drivers
      }));
      router.push('/dashboard');
    } else {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">FOREAS Partners</h1>
        <p className="text-purple-300 mb-6">Espace partenaires</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-purple-300 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-purple-300 text-sm mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Afficher les comptes test en développement */}
        <div className="mt-8 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
          <p className="text-purple-300 text-sm font-bold mb-2">Comptes test disponibles :</p>
          <div className="space-y-1 text-xs text-gray-400">
            <p>🏢 dupont@location.fr / dupont2024</p>
            <p>🎓 formation@vtc.fr / vtc2024</p>
            <p>🚗 elite@cars.fr / elite2024</p>
            <p>🧪 test@foreas.com / test2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}