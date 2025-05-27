import React from 'react';
import { useNavigate } from 'react-router-dom';

const MatchResults = ({ matchResults }) => {
  const navigate = useNavigate();

  // Additional match data
  const additionalMatches = [
    {
      id: 5,
      homeTeam: "Lakers",
      homeScore: 112,
      awayTeam: "Nuggets",
      awayScore: 108,
      date: "2024-04-20",
      status: "Final",
      series: "LAL leads 1-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/den.png"
    },
    {
      id: 6,
      homeTeam: "Lakers",
      homeScore: 105,
      awayTeam: "Warriors",
      awayScore: 98,
      date: "2024-04-18",
      status: "Final",
      series: "LAL leads 2-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png"
    },
    {
      id: 7,
      homeTeam: "Suns",
      homeScore: 115,
      awayTeam: "Lakers",
      awayScore: 110,
      date: "2024-04-15",
      status: "Final",
      series: "PHX leads 1-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/phx.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png"
    },
    {
      id: 8,
      homeTeam: "Lakers",
      homeScore: 120,
      awayTeam: "Clippers",
      awayScore: 118,
      date: "2024-04-12",
      status: "Final",
      series: "LAL leads 1-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png"
    },
    {
      id: 9,
      homeTeam: "Lakers",
      homeScore: 95,
      awayTeam: "Grizzlies",
      awayScore: 92,
      date: "2024-04-10",
      status: "Final",
      series: "LAL leads 2-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/mem.png"
    },
    {
      id: 10,
      homeTeam: "Pelicans",
      homeScore: 108,
      awayTeam: "Lakers",
      awayScore: 112,
      date: "2024-04-08",
      status: "Final",
      series: "LAL leads 1-0",
      homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/no.png",
      awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png"
    }
  ];

  // Combine existing matches with new ones
  const allMatches = [...matchResults, ...additionalMatches];

  return (
    <section className="py-6 md:py-10 px-2 md:px-4">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Match Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {allMatches.map((match) => (
          <div 
            key={match.id} 
            className="bg-purple-50 rounded-lg shadow-md p-3 md:p-4 hover:scale-[1.02] transform transition duration-300 cursor-pointer"
            onClick={() => navigate(`/match/${match.id}`, { state: { match } })}
          >
            <div className="text-[10px] md:text-xs text-gray-600 mb-2">
              {match.status} - {new Date(match.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={match.awayImage} alt={match.awayTeam} className="w-5 h-5 md:w-6 md:h-6 mr-1" />
                <span className="font-semibold text-gray-800 text-xs md:text-sm truncate">{match.awayTeam}</span>
              </div>
              <span className="font-bold text-gray-800 text-xs md:text-sm">{match.awayScore}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={match.homeImage} alt={match.homeTeam} className="w-5 h-5 md:w-6 md:h-6 mr-1" />
                <span className="font-semibold text-gray-800 text-xs md:text-sm truncate">{match.homeTeam}</span>
              </div>
              <span className="font-bold text-gray-800 text-xs md:text-sm">{match.homeScore}</span>
            </div>
            {match.series && (
              <div className="text-[10px] md:text-xs text-gray-500 mt-2">Series: {match.series}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MatchResults;