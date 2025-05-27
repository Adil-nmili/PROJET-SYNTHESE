import React, { useState } from 'react';
import { Button } from '../ui/button';

const PlayerStats = ({ playerStats }) => {
  const [showAll, setShowAll] = useState(false);
  const players = playerStats || [];
  const displayedPlayers = showAll ? players : players.slice(0, 3);

  return (
    <section className="py-6 md:py-10 px-2 md:px-4 bg-purple-50">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Player Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {displayedPlayers.map((player) => (
          <div 
            key={player.id} 
            className="bg-white rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-3 md:mb-4">
              <img
                src={player.image}
                alt={player.name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-3 md:mr-4 border-2 border-purple-600"
              />
              <h3 className="text-base md:text-xl font-bold text-gray-800 truncate">{player.name}</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
              <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Points</p>
                <p className="text-base md:text-xl font-bold text-purple-600">{player.points}</p>
              </div>
              <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Rebounds</p>
                <p className="text-base md:text-xl font-bold text-purple-600">{player.rebounds}</p>
              </div>
              <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Assists</p>
                <p className="text-base md:text-xl font-bold text-purple-600">{player.assists}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {players.length > 3 && (
        <div className="flex justify-center mt-6 md:mt-8">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default PlayerStats;