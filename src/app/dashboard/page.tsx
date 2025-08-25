'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function PartnersDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [partnerInfo, setPartnerInfo] = useState<any>(null);
  const router = useRouter();
  
  const [partnerData, setPartnerData] = useState({
    activeDrivers: 0,
    monthlyCommission: 0,
    projectedAnnual: 0,
    rank: 3,
    totalPartners: 47,
    conversionRate: 34,
    clicksThisWeek: 12
  });

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('foreas_auth');
      const storedPartnerData = localStorage.getItem('partner_data');
      
      if (authStatus === 'true' && storedPartnerData) {
        setIsAuthenticated(true);
        const partner = JSON.parse(storedPartnerData);
        setPartnerInfo(partner);
        
        // Mettre à jour les données avec les vraies infos du partenaire
        setPartnerData({
          activeDrivers: partner.drivers || 0,
          monthlyCommission: (partner.drivers || 0) * 10,
          projectedAnnual: (partner.drivers || 0) * 10 * 12,
          rank: partner.drivers > 50 ? 1 : partner.drivers > 30 ? 2 : 3,
          totalPartners: 47,
          conversionRate: 34,
          clicksThisWeek: 12
        });
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      {/* Orbes animées */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float top-0 right-0" />
        <div className="absolute w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-float-delayed bottom-0 left-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        
        {/* Rang et Statut */}
        <div className="glass-card p-6 mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{partnerInfo?.name || 'Partenaire FOREAS'}</h2>
            <p className="text-purple-300">Top #{partnerData.rank} sur {partnerData.totalPartners} partenaires</p>
            <p className="text-purple-400 text-sm">{partnerInfo?.email}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-2">
              {partnerData.activeDrivers >= 60 ? '💎' : partnerData.activeDrivers >= 30 ? '🥇' : '🥈'}
            </div>
            <p className="text-yellow-400 font-bold">
              {partnerData.activeDrivers >= 60 ? 'PLATINUM Partner' : partnerData.activeDrivers >= 30 ? 'GOLD Partner' : 'SILVER Partner'}
            </p>
            <div className="w-48 h-2 bg-gray-700 rounded-full mt-2">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" 
                style={{width: `${Math.min(100, (partnerData.activeDrivers / 60) * 100)}%`}}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {partnerData.activeDrivers >= 60 ? 'Niveau maximum atteint!' : `${60 - partnerData.activeDrivers} chauffeurs pour PLATINUM`}
            </p>
          </div>
        </div>

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <p className="text-purple-300 text-sm mb-2">Chauffeurs Actifs</p>
            <p className="text-4xl font-bold mb-2">{partnerData.activeDrivers}</p>
            <p className="text-green-400 text-sm">+5 ce mois</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-purple-300 text-sm mb-2">Commission Ce Mois</p>
            <p className="text-4xl font-bold mb-2">€{partnerData.monthlyCommission}</p>
            <p className="text-green-400 text-sm">€10 × {partnerData.activeDrivers} chauffeurs</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-purple-300 text-sm mb-2">Projection Annuelle</p>
            <p className="text-4xl font-bold mb-2">€{partnerData.projectedAnnual}</p>
            <p className="text-blue-400 text-sm">Si stabilité maintenue</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-purple-300 text-sm mb-2">Taux Conversion</p>
            <p className="text-4xl font-bold mb-2">{partnerData.conversionRate}%</p>
            <p className="text-yellow-400 text-sm">Meilleur que 85% des partenaires</p>
          </div>
        </div>

        {/* Calculateur de potentiel */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">💰 Calculateur de Potentiel</h3>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-lg">
            <p className="text-lg mb-2">Si vous ajoutez <strong>5 chauffeurs</strong> de plus :</p>
            <p className="text-3xl font-bold text-green-400">+€50/mois → €600/an</p>
            <p className="text-sm text-gray-400 mt-2">Basé sur vos stats actuelles de rétention</p>
          </div>
        </div>

        {/* Kit Convaincre Auto-généré */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">🎯 Kit Convaincre (Mis à jour en temps réel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
              <p className="text-green-400 font-bold">Revenu Moyen</p>
              <p className="text-2xl font-bold">€247/jour</p>
              <p className="text-sm text-gray-400">Vos chauffeurs sur FOREAS</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
              <p className="text-blue-400 font-bold">Temps d&apos;Attente</p>
              <p className="text-2xl font-bold">3 min</p>
              <p className="text-sm text-gray-400">vs 12 min Uber</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
              <p className="text-purple-400 font-bold">Zone La Défense</p>
              <p className="text-2xl font-bold">+35%</p>
              <p className="text-sm text-gray-400">Demandes ce mois</p>
            </div>
          </div>
        </div>

        {/* Tracking Liens */}
        <div className="glass-card p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">🔗 Votre Lien de Parrainage</h3>
          <div className="flex gap-4 items-center">
            <input 
              value="https://foreas.app/p/dupont-42" 
              readOnly 
              className="flex-1 p-3 bg-white/10 rounded-lg text-white"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold">
              Copier
            </button>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex-1 text-center">
              <p className="text-3xl font-bold text-purple-400">{partnerData.clicksThisWeek}</p>
              <p className="text-sm text-gray-400">Clics cette semaine</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-3xl font-bold text-green-400">4</p>
              <p className="text-sm text-gray-400">Inscriptions</p>
            </div>
          </div>
        </div>

        {/* Feed Live */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-4">🔥 Activité Live de Vos Chauffeurs</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
              <span>🎉 Jean D. vient de faire €180 aujourd&apos;hui!</span>
              <span className="text-green-400">il y a 2 min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
              <span>📈 Marie L. : 12 courses (record personnel)</span>
              <span className="text-blue-400">il y a 15 min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
              <span>💰 Commission de €2.40 générée (Ahmed K.)</span>
              <span className="text-purple-400">il y a 1h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}