import React, { useState, useEffect } from 'react';
import NewsSlider from '@/components/Partials/NewsSlider'; 
import MatchResults from '@/components/Partials/MatchResults';
import LatestNews from '@/components/Partials/LatestNews';
import PlayerStats from '@/components/Partials/PlayerStats';
import MatchCalendar from '@/components/Partials/MatchCalendar';
import Standings from '@/components/Partials/Standings';
import Videos from '@/components/Partials/Videos';
import NewsModal from '@/components/Partials/NewsModal';
import mockMatchesData from '@/data/mockMatchesData.json';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [standings, setStandings] = useState([]);
  const [matchResults, setMatchResults] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create news from match data
        const newsFromMatches = mockMatchesData.flatMap(day => 
          day.matches.map(match => ({
            id: match.id,
            title: `${match.homeTeam} vs ${match.awayTeam} - ${match.homeScore}-${match.awayScore}`,
            content: `In an exciting match, ${match.homeTeam} faced ${match.awayTeam}. The game ended with a score of ${match.homeScore}-${match.awayScore}. ${match.homeTeamStats[0].name} led the scoring with ${match.homeTeamStats[0].points} points, while ${match.awayTeamStats[0].name} scored ${match.awayTeamStats[0].points} points for ${match.awayTeam}.`,
            author: "NBA News",
            date: day.date,
            category: "Match Report",
            image: match.homeLogo,
            videoUrl: "https://www.youtube.com/embed/zu7XWu5wrMg"
          }))
        );

        // Add player performance news
        const playerNews = mockMatchesData[0].playerStats.slice(0, 3).map(player => ({
          id: `player-${player.id}`,
          title: `${player.name} - ${player.points} Points Performance`,
          content: `${player.name} had an outstanding performance with ${player.points} points, ${player.rebounds} rebounds, and ${player.assists} assists. This remarkable display of skill and athleticism helped lead their team to victory.`,
          author: "NBA Stats",
          date: "2024-03-30",
          category: "Player Performance",
          image: player.image,
          videoUrl: "https://www.youtube.com/embed/zu7XWu5wrMg"
        }));

        const allNews = [...newsFromMatches, ...playerNews];

        setNews(allNews);
        setPlayerStats(mockMatchesData[0].playerStats);
        setCalendar(mockMatchesData);
        setStandings(mockMatchesData[0].standings);
        setMatchResults(mockMatchesData.map(day => 
          day.matches.map(match => ({
            id: match.id,
            homeTeam: match.homeTeam,
            homeScore: match.homeScore,
            awayTeam: match.awayTeam,
            awayScore: match.awayScore,
            date: day.date,
            status: match.status,
            homeImage: match.homeLogo,
            awayImage: match.awayLogo,
            matchSummaryUrl: `#/match-details/${match.id}`
          }))
        ).flat());
        setLoading(false);
      } catch (err) {
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-red-500 text-base md:text-xl px-4 text-center">{error}</div>
      </div>
    );
  }

  // Filter news items that have a video URL
  const videos = news.filter(item => item.videoUrl);

  return (
    <div className="min-h-screen bg-white/90">
      <div className="">
        <NewsSlider news={news} />
        <div className="px-2 md:px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-4 md:gap-1">
            <div className="space-y-4 md:space-y-6">
              <LatestNews news={news} onArticleClick={setSelectedArticle} />
              <MatchResults matchResults={matchResults} />
            </div>
            <div className="space-y-4 md:space-y-6">
              <PlayerStats playerStats={playerStats} />
              <Standings standings={standings} />
            </div>
          </div>
          <div className="mt-4 md:mt-6 space-y-4 md:space-y-6">
            <MatchCalendar calendar={calendar} />
            <Videos videos={videos} />
          </div>
        </div>
      </div>
      <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};

export default NewsPage;
