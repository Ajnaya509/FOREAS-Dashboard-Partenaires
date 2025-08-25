'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import RevenueChart from '@/components/RevenueChart';
import LiveActivity from '@/components/LiveActivity';

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('foreas_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="dashboard-container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="dashboard-container">
      {/* Animated Background Orbs */}
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart />
          <LiveActivity />
        </div>
        
        {/* Configuration Panel */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Configuration Système</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-purple-300 text-sm mb-1">API Backend</p>
              <p className="text-white font-semibold">🟢 Connecté</p>
              <p className="text-green-400 text-xs">{process.env.NEXT_PUBLIC_API_URL || 'localhost:3335'}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-purple-300 text-sm mb-1">Base de Données</p>
              <p className="text-white font-semibold">🟢 Supabase</p>
              <p className="text-green-400 text-xs">Connexion active</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-purple-300 text-sm mb-1">Environnement</p>
              <p className="text-white font-semibold">🚀 Production</p>
              <p className="text-purple-400 text-xs">v2.1.0</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Gérer Chauffeurs', icon: '👥', color: 'from-blue-500 to-cyan-500' },
            { title: 'Statistiques', icon: '📊', color: 'from-purple-500 to-pink-500' },
            { title: 'Paiements', icon: '💳', color: 'from-green-500 to-emerald-500' },
            { title: 'Support', icon: '🎧', color: 'from-orange-500 to-red-500' }
          ].map((action, index) => (
            <button
              key={action.title}
              className={`glass-card-hover p-4 rounded-xl bg-gradient-to-r ${action.color} bg-opacity-20 border border-white/10 text-white transition-all duration-300 hover:scale-105`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <p className="font-semibold">{action.title}</p>
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-purple-300/60">
          <p>© 2025 FOREAS - Dashboard Premium</p>
          <p className="text-sm mt-1">Propulsé par l&apos;IA • Déployé sur Vercel</p>
        </div>
      </div>
    </div>
  );
}