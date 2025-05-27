import React from 'react';
import { Link } from 'react-router-dom';

const MatchCalendar = ({ calendar }) => {
  return (
    <section className="py-10 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Match Schedule</h2>
      <div className="max-w-4xl mx-auto">
        {calendar && Array.isArray(calendar) && calendar.length > 0 ? (
          calendar.map((day) => (
            <div key={day.date} className="mb-8 border-b border-gray-300 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-700 text-base md:text-lg font-semibold bg-gray-100">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {day.matches && Array.isArray(day.matches) && day.matches.length > 0 ? (
                day.matches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg p-3 md:p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0"
                  >
                    {/* League and Status */}
                    <div className="flex flex-row md:flex-col items-center md:items-start justify-center w-full md:w-24 flex-shrink-0">
                      <span className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase mr-2 md:mr-0">{match.league}</span>
                      <span className="text-[11px] md:text-sm font-bold text-green-600">{match.status}</span>
                    </div>

                    {/* Match Details */}
                    <div className="flex items-center flex-1 justify-center space-x-3 md:space-x-6">
                      {/* Home Team */}
                      <div className="flex flex-col items-center w-16 md:w-24">
                        <img src={match.homeLogo} alt={match.homeTeam} className="w-8 h-8 md:w-10 md:h-10 object-contain mb-1" />
                        <span className="text-[10px] md:text-sm font-semibold text-gray-800 text-center">{match.homeTeam}</span>
                      </div>

                      {/* Score */}
                      <div className="flex items-center space-x-1 text-base md:text-xl font-bold">
                        <span className="text-gray-800">{match.homeScore}</span>
                        <span className="text-gray-500">-</span>
                        <span className="text-gray-800">{match.awayScore}</span>
                      </div>

                      {/* Away Team */}
                      <div className="flex flex-col items-center w-16 md:w-24">
                        <img src={match.awayLogo} alt={match.awayTeam} className="w-8 h-8 md:w-10 md:h-10 object-contain mb-1" />
                        <span className="text-[10px] md:text-sm font-semibold text-gray-800 text-center">{match.awayTeam}</span>
                      </div>
                    </div>

                    {/* Replay Link */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-center w-full md:w-28 flex-shrink-0">
                      <Link 
                        to={`/match-details/${match.id}`} 
                        state={{ 
                          match: {
                            ...match,
                            date: day.date,
                            homeTeamStats: match.homeTeamStats,
                            awayTeamStats: match.awayTeamStats
                          }
                        }} 
                        className="text-purple-600 text-[11px] md:text-sm hover:text-purple-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 italic">No matches available for this date.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No match schedule available.</p>
        )}
      </div>
    </section>
  );
};

export default MatchCalendar;