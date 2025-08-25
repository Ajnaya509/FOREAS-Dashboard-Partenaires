'use client';

import { useEffect, useRef, useState } from 'react';

interface ChartData {
  time: string;
  revenue: number;
}

export default function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<ChartData[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Initialiser avec des données de démonstration
    const initialData: ChartData[] = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      initialData.push({
        time: time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        revenue: Math.floor(Math.random() * 500) + 100
      });
    }
    setData(initialData);
  }, []);

  useEffect(() => {
    if (!data.length) return;
    drawChart();
    
    // Mettre à jour les données toutes les 5 secondes
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const now = new Date();
        newData.push({
          time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          revenue: Math.floor(Math.random() * 500) + 100
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    
    // Effacer le canvas
    ctx.clearRect(0, 0, width, height);
    
    if (data.length === 0) return;

    const maxRevenue = Math.max(...data.map(d => d.revenue));
    const minRevenue = Math.min(...data.map(d => d.revenue));
    const range = maxRevenue - minRevenue;

    // Dessiner la grille
    ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Dessiner la courbe
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#8b5cf6';
    ctx.shadowBlur = 10;
    
    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((point.revenue - minRevenue) / range) * (height - 2 * padding);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Dessiner l'aire sous la courbe
    ctx.shadowBlur = 0;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.01)');
    ctx.fillStyle = gradient;
    
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((point.revenue - minRevenue) / range) * (height - 2 * padding);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Dessiner les points
    data.forEach((point, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - ((point.revenue - minRevenue) / range) * (height - 2 * padding);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    // Labels des axes
    ctx.fillStyle = '#a855f7';
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';
    
    // Labels de temps (quelques points seulement)
    for (let i = 0; i < data.length; i += Math.floor(data.length / 6)) {
      const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
      ctx.fillText(data[i].time, x, height - 10);
    }
    
    // Labels de revenus
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      const value = maxRevenue - (i * range) / 5;
      ctx.fillText(`€${Math.round(value)}`, padding - 10, y + 4);
    }
  };

  const currentRevenue = data.length > 0 ? data[data.length - 1].revenue : 0;
  const previousRevenue = data.length > 1 ? data[data.length - 2].revenue : currentRevenue;
  const change = ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Revenus en Temps Réel</h3>
          <p className="text-purple-300 text-sm">Dernières 24 heures</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">€{currentRevenue}</p>
          <p className={`text-sm font-semibold ${parseFloat(change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {parseFloat(change) >= 0 ? '+' : ''}{change}% vs précédent
          </p>
        </div>
      </div>
      
      <div className="relative h-64 w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-purple-300 text-sm">Revenus</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-green-300 text-sm">Tendance</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isAnimating ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'
        }`}>
          {isAnimating ? 'Mise à jour...' : 'En direct'}
        </div>
      </div>
    </div>
  );
}