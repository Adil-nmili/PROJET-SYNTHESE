import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SliderNewsDetail from '@/components/Partials/SliderNewsDetail';
import { motion } from 'framer-motion';

const MatchDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { match } = location.state || {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (!match) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-screen bg-white/90"
      >
        <div className="text-center py-10">
          <p className="text-red-600 mb-4">Match data not available. Please navigate from the calendar.</p>
          <button 
            onClick={() => navigate('/news')}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-200"
          >
            Back to Calendar
          </button>
        </div>
      </motion.div>
    );
  }

  // Data for slider
  const sliderImages = [
    {
      id: 1,
      image: match.homeLogo,
      title: `${match.homeTeam} vs ${match.awayTeam}`,
      description: `Match ${match.league} - ${new Date(match.date).toLocaleDateString('en-US')}`
    },
    {
      id: 2,
      image: match.awayLogo,
      title: `${match.awayTeam} vs ${match.homeTeam}`,
      description: `Match ${match.league} - ${new Date(match.date).toLocaleDateString('en-US')}`
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full bg-white/90  md:px-6"
    >
      {/* Slider News Detail */}
      <motion.div variants={itemVariants}>
        <SliderNewsDetail images={sliderImages} />
      </motion.div>

      {/* Match Summary with Logos and Score */}
      <motion.div 
        variants={itemVariants}
        className="bg-white shadow-md p-4 md:p-8 mb-4 md:mb-8 w-full rounded-lg"
      >
        <div className="flex flex-col md:flex-row justify-around items-center text-center space-y-6 md:space-y-0">
          {/* Home Team */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={match.homeLogo} alt={match.homeTeam} className="w-14 h-14 md:w-24 md:h-24 object-contain mb-2 md:mb-3" />
            <span className="text-base md:text-xl font-semibold text-gray-800">{match.homeTeam}</span>
          </motion.div>

          {/* Score */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-4 md:space-x-6 text-2xl md:text-5xl font-bold"
          >
            <span className="text-gray-800">{match.homeScore}</span>
            <span className="text-gray-400">-</span>
            <span className="text-gray-800">{match.awayScore}</span>
          </motion.div>

          {/* Away Team */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src={match.awayLogo} alt={match.awayTeam} className="w-14 h-14 md:w-24 md:h-24 object-contain mb-2 md:mb-3" />
            <span className="text-base md:text-xl font-semibold text-gray-800">{match.awayTeam}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Match Details */}
      <motion.div 
        variants={itemVariants}
        className="bg-white shadow-md p-4 md:p-6 mb-4 md:mb-8 w-full rounded-lg"
      >
        <h3 className="text-lg md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 border-b pb-4 text-center">Match Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
          <div className="space-y-3 md:space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">League:</span> {match.league}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> 
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs md:text-sm">
                {match.status}
              </span>
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Date:</span> {new Date(match.date).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Player Statistics Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white shadow-md p-4 md:p-6 w-full mb-8 flex justify-center gap-2 flex-col rounded-lg"
      >
        <h3 className="text-lg md:text-2xl font-bold mb-6 text-gray-800 border-b pb-4 text-center">Player Statistics</h3>
        
        {/* Home Team Stats */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 max-w-4xl mx-auto w-full"
        >
          <h4 className="text-base md:text-xl font-semibold mb-6 text-gray-700 flex items-center justify-center">
            <img src={match.homeLogo} alt={match.homeTeam} className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            {match.homeTeam}
          </h4>
          {match.homeTeamStats && match.homeTeamStats.length > 0 ? (
            <div className="overflow-x-auto flex justify-center">
              <table className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="min-w-[100px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Player</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Points</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Rebounds</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Assists</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Steals</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Blocks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {match.homeTeamStats.map((player) => (
                    <motion.tr 
                      key={player.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="min-w-[100px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap border-r border-gray-200">
                        <div className="flex items-center justify-center md:justify-start">
                          <img className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover md:mr-2" src={player.image} alt={player.name} />
                          <div className="hidden md:block text-xs font-medium text-gray-900 truncate">{player.name}</div>
                        </div>
                      </td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.points}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.rebounds}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.assists}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.steals}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500">{player.blocks}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No statistics available for the home team.</p>
          )}
        </motion.div>

        {/* Away Team Stats */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto w-full"
        >
          <h4 className="text-base md:text-xl font-semibold mb-6 text-gray-700 flex items-center justify-center">
            <img src={match.awayLogo} alt={match.awayTeam} className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            {match.awayTeam}
          </h4>
          {match.awayTeamStats && match.awayTeamStats.length > 0 ? (
            <div className="overflow-x-auto flex justify-center">
              <table className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="min-w-[100px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Player</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Points</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Rebounds</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Assists</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Steals</th>
                    <th className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">Blocks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {match.awayTeamStats.map((player) => (
                    <motion.tr 
                      key={player.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="min-w-[100px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap border-r border-gray-200">
                        <div className="flex items-center justify-center md:justify-start">
                          <img className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover md:mr-2" src={player.image} alt={player.name} />
                          <div className="hidden md:block text-xs font-medium text-gray-900 truncate">{player.name}</div>
                        </div>
                      </td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.points}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.rebounds}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.assists}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500 border-r border-gray-200">{player.steals}</td>
                      <td className="min-w-[40px] px-2 py-1 md:px-3 md:py-2 whitespace-nowrap text-[10px] md:text-xs text-gray-500">{player.blocks}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No statistics available for the away team.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MatchDetailsPage;