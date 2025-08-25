'use client';

import { useEffect, useState } from 'react';

interface Activity {
  id: string;
  type: 'trip_completed' | 'driver_online' | 'payment_received' | 'new_booking';
  message: string;
  timestamp: Date;
  amount?: string;
  driver?: string;
  location?: string;
}

const activityTemplates = [
  { type: 'trip_completed', message: 'Course terminée', icon: '✅', color: 'text-green-400' },
  { type: 'driver_online', message: 'Chauffeur connecté', icon: '🚗', color: 'text-blue-400' },
  { type: 'payment_received', message: 'Paiement reçu', icon: '💰', color: 'text-yellow-400' },
  { type: 'new_booking', message: 'Nouvelle réservation', icon: '📱', color: 'text-purple-400' }
];

const drivers = ['Ahmed M.', 'Fatima K.', 'Mohamed B.', 'Aicha L.', 'Youssef R.', 'Khadija N.'];
const locations = ['Centre-ville', 'Aéroport', 'Gare', 'Marina', 'Medina', 'Maarif'];

export default function LiveActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const generateActivity = (): Activity => {
    const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const amount = `€${(Math.random() * 50 + 10).toFixed(2)}`;

    let message = template.message;
    if (template.type === 'trip_completed') {
      message = `Course terminée par ${driver} (${location})`;
    } else if (template.type === 'driver_online') {
      message = `${driver} est maintenant en ligne`;
    } else if (template.type === 'payment_received') {
      message = `Paiement de ${amount} reçu`;
    } else if (template.type === 'new_booking') {
      message = `Nouvelle course vers ${location}`;
    }

    return {
      id: Date.now().toString() + Math.random(),
      type: template.type as Activity['type'],
      message,
      timestamp: new Date(),
      amount: template.type === 'payment_received' ? amount : undefined,
      driver: template.type !== 'new_booking' ? driver : undefined,
      location
    };
  };

  useEffect(() => {
    // Générer quelques activités initiales
    const initialActivities: Activity[] = [];
    for (let i = 0; i < 5; i++) {
      const activity = generateActivity();
      activity.timestamp = new Date(Date.now() - i * 30000); // Espacer de 30 secondes
      initialActivities.push(activity);
    }
    setActivities(initialActivities.reverse());

    // Générer de nouvelles activités toutes les 3-8 secondes
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Garder seulement les 10 dernières
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(interval);
  }, []);

  const getActivityTemplate = (type: Activity['type']) => {
    return activityTemplates.find(t => t.type === type) || activityTemplates[0];
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Activité en Direct</h3>
          <p className="text-purple-300 text-sm">Événements temps réel</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm font-semibold">En direct</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {activities.map((activity, index) => {
          const template = getActivityTemplate(activity.type);
          return (
            <div
              key={activity.id}
              className={`flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 ${
                index === 0 ? 'animate-slide-in' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm ${
                  index === 0 ? 'animate-bounce' : ''
                }`}>
                  {template.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-semibold ${template.color}`}>
                    {activity.message}
                  </p>
                  <span className="text-purple-300 text-xs">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-purple-300">
                  {activity.amount && (
                    <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                      {activity.amount}
                    </span>
                  )}
                  {activity.location && (
                    <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      📍 {activity.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {activityTemplates.map((template) => {
            const count = activities.filter(a => a.type === template.type).length;
            return (
              <div key={template.type} className="space-y-1">
                <div className="text-2xl">{template.icon}</div>
                <div className={`text-lg font-bold ${template.color}`}>{count}</div>
                <div className="text-purple-300 text-xs">{template.message}s</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}