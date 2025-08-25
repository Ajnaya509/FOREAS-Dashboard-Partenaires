'use client';

import { useEffect, useState } from 'react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
}

export default function StatsGrid() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Revenus Aujourd&apos;hui',
      value: '€2,856',
      change: '+12.5%',
      icon: '💰',
      trend: 'up'
    },
    {
      title: 'Chauffeurs Actifs',
      value: '142',
      change: '+8%',
      icon: '🚗',
      trend: 'up'
    },
    {
      title: 'Courses Terminées',
      value: '87',
      change: '+15%',
      icon: '✅',
      trend: 'up'
    },
    {
      title: 'Temps Moyen',
      value: '3.2 min',
      change: '-5%',
      icon: '⏱️',
      trend: 'down'
    }
  ]);


  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        const baseValue = parseInt(stat.value.replace(/[^\d]/g, '')) || 0;
        const variation = Math.floor(Math.random() * 10) - 5;
        const newValue = Math.max(0, baseValue + variation);
        
        if (stat.title.includes('Revenus')) {
          return { ...stat, value: `€${newValue.toLocaleString()}` };
        }
        if (stat.title.includes('Temps')) {
          return { ...stat, value: `${(newValue / 100).toFixed(1)} min` };
        }
        return { ...stat, value: newValue.toString() };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:bg-white/10"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
                {stat.icon}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                stat.trend === 'up' 
                  ? 'bg-green-500/20 text-green-400' 
                  : stat.trend === 'down'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-purple-300 text-sm font-medium">{stat.title}</p>
              <p className="text-white text-2xl font-bold animate-number-change">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}