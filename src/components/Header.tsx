export default function Header() {
  return (
    <header className="glass-card p-6 mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        FOREAS Partners
      </h1>
      <button 
        onClick={() => {
          localStorage.removeItem('foreas_auth');
          window.location.href = '/login';
        }}
        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
      >
        Déconnexion
      </button>
    </header>
  );
}