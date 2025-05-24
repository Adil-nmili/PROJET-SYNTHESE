import React from 'react';

const PlayerStats = ({ playerStats }) => {
  return (
    <section className="py-10 px-4 bg-purple-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Statistiques des Joueurs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playerStats.map((player) => (
          <div key={player.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <img
                src={player.image}
                alt={player.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-600"
              />
              <h3 className="text-xl font-bold text-gray-800">{player.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-600">Points</p>
                <p className="text-xl font-bold text-purple-600">{player.points}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-600">Rebonds</p>
                <p className="text-xl font-bold text-purple-600">{player.rebounds}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-gray-600">Passes</p>
                <p className="text-xl font-bold text-purple-600">{player.assists}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayerStats; 