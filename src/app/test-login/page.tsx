'use client';

import { useState } from 'react';

const PARTNERS_DB = [
  { email: 'dupont@location.fr', password: 'dupont2024', name: 'Agence Dupont Location', drivers: 42 },
  { email: 'formation@vtc.fr', password: 'vtc2024', name: 'Centre Formation VTC Paris', drivers: 28 },
  { email: 'elite@cars.fr', password: 'elite2024', name: 'Elite Cars Services', drivers: 67 },
  { email: 'test@foreas.com', password: 'test2024', name: 'Partenaire Test', drivers: 15 }
];

export default function TestLogin() {
  const [result, setResult] = useState('');

  const testLogin = (email: string, password: string) => {
    const partner = PARTNERS_DB.find(p => p.email === email && p.password === password);
    if (partner) {
      setResult(`✅ SUCCESS: Login working for ${partner.name} (${partner.drivers} drivers)`);
      // Simuler le stockage
      localStorage.setItem('foreas_auth', 'true');
      localStorage.setItem('partner_data', JSON.stringify(partner));
    } else {
      setResult(`❌ FAILED: Invalid credentials for ${email}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">🧪 Test Authentification FOREAS</h1>
      
      <div className="space-y-4">
        {PARTNERS_DB.map((partner) => (
          <div key={partner.email} className="border border-gray-700 p-4 rounded">
            <p><strong>{partner.name}</strong></p>
            <p>Email: {partner.email}</p>
            <p>Password: {partner.password}</p>
            <p>Chauffeurs: {partner.drivers}</p>
            <button 
              onClick={() => testLogin(partner.email, partner.password)}
              className="bg-purple-600 px-4 py-2 rounded mt-2"
            >
              Test Login
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-900 rounded">
        <h3 className="font-bold mb-2">Résultat:</h3>
        <p className={result.includes('✅') ? 'text-green-400' : 'text-red-400'}>
          {result || 'Aucun test effectué'}
        </p>
      </div>

      <div className="mt-4">
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="bg-blue-600 px-4 py-2 rounded mr-4"
        >
          → Aller au Dashboard
        </button>
        <button 
          onClick={() => window.location.href = '/login'}
          className="bg-green-600 px-4 py-2 rounded"
        >
          → Login Principal
        </button>
      </div>
    </div>
  );
}