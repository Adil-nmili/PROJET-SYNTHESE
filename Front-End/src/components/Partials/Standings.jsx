import React from 'react';

const Standings = ({ standings }) => {
  // Calculate win percentage
  const calculateWinPercentage = (wins, losses) => {
    const total = wins + losses;
    if (total === 0) return 0;
    return (wins / total).toFixed(3);
  };

  return (
    <section className="py-6 md:py-10 px-2 md:px-4 bg-purple-50">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Western Conference Standings</h2>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-1.5 md:px-4 md:py-2.5 border-b-2 border-gray-200 bg-gray-100 text-left text-[9px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pos
                </th>
                <th className="px-2 py-1.5 md:px-4 md:py-2.5 border-b-2 border-gray-200 bg-gray-100 text-left text-[9px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-2 py-1.5 md:px-4 md:py-2.5 border-b-2 border-gray-200 bg-gray-100 text-left text-[9px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  W
                </th>
                <th className="px-2 py-1.5 md:px-4 md:py-2.5 border-b-2 border-gray-200 bg-gray-100 text-left text-[9px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  L
                </th>
                <th className="px-2 py-1.5 md:px-4 md:py-2.5 border-b-2 border-gray-200 bg-gray-100 text-left text-[9px] md:text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.id || index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-gray-200 text-[10px] md:text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                  </td>
                  <td className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-gray-200 text-[10px] md:text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 md:w-8 md:h-8">
                        <img
                          className="w-full h-full rounded-full object-cover"
                          src={team.image}
                          alt={team.team}
                        />
                      </div>
                      <div className="ml-1.5 md:ml-2">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {team.team}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-gray-200 text-[10px] md:text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{team.wins}</p>
                  </td>
                  <td className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-gray-200 text-[10px] md:text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{team.losses}</p>
                  </td>
                  <td className="px-2 py-1.5 md:px-4 md:py-2.5 border-b border-gray-200 text-[10px] md:text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {calculateWinPercentage(team.wins, team.losses)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Standings;