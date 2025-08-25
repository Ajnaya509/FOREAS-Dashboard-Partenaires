'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || 'URL non configurée');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            FOREAS
          </h1>
          <p className="text-xl text-blue-300 mb-2">Dashboard Partenaires</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Statut API</p>
                <p className="text-white text-2xl font-bold">🟢 Connecté</p>
              </div>
              <div className="text-4xl">🚀</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Chauffeurs Actifs</p>
                <p className="text-white text-2xl font-bold">127</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Revenus Aujourd&apos;hui</p>
                <p className="text-white text-2xl font-bold">€2,456</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Configuration</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-blue-300">URL API Backend:</span>
              <code className="bg-black/30 px-3 py-1 rounded text-green-300 text-sm">
                {apiUrl}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Environnement:</span>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded text-sm">
                Production
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300">Version:</span>
              <span className="text-white">v2.1.0</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">🎯 Actions Rapides</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                📊 Voir les statistiques détaillées
              </button>
              <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                👥 Gérer les chauffeurs
              </button>
              <button className="w-full text-left p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                💳 Configuration des paiements
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">📈 Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-300">Courses aujourd&apos;hui:</span>
                <span className="text-white font-bold">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Satisfaction client:</span>
                <span className="text-green-400 font-bold">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-300">Temps d&apos;attente moyen:</span>
                <span className="text-white font-bold">3.2 min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300/60">
          <p>© 2024 FOREAS - Dashboard Partenaires</p>
          <p className="text-sm mt-1">Déployé sur Vercel avec ❤️</p>
        </div>
      </div>
    </div>
  );
}
