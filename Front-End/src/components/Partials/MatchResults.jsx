import React from 'react';

const MatchResults = ({ matchResults }) => {
  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Résultats des Matchs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchResults.map((match) => (
          <div key={match.id} className="bg-purple-50 rounded-xl shadow-lg p-6 hover:scale-105 transform transition duration-300">
            <div className="text-sm text-gray-600 mb-2">{match.status} - {new Date(match.date).toLocaleDateString()}</div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={match.awayImage} alt={match.awayTeam} className="w-8 h-8 mr-2" />
                <span className="font-semibold text-gray-800">{match.awayTeam}</span>
              </div>
              <span className="font-bold text-gray-800">{match.awayScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={match.homeImage} alt={match.homeTeam} className="w-8 h-8 mr-2" />
                <span className="font-semibold text-gray-800">{match.homeTeam}</span>
              </div>
              <span className="font-bold text-gray-800">{match.homeScore}</span>
            </div>
            {match.series && (
              <div className="text-sm text-gray-500 mt-2">Série: {match.series}</div>
            )}
            <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200">
              RÉCIT DU MATCH
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchResults;