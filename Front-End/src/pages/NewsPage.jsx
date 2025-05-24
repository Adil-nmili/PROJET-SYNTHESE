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
        // Utiliser les données de mockMatchesData.json
        const mockData = {
          news: [
            {
              id: 1,
              title: "LeBron James leads Lakers to spectacular victory against Celtics",
              content: "In an exciting match, LeBron James delivered a masterful performance, dominating with **35 points, 10 rebounds, 8 assists and 2 steals**. The Lakers overcame a 15-point deficit to win against their historic rivals, the Boston Celtics. Team cohesion in the final minutes was decisive.",
              author: "NBA News",
              date: "2024-03-20",
              category: "Match Highlights",
              image: "/players/lebron.jpg",
              videoUrl: "https://www.youtube.com/embed/example_lebron_highlight"
            },
            {
              id: 2,
              title: "Anthony Davis, defensive wall against Warriors",
              content: "Anthony Davis was the Lakers' defensive pillar, recording **28 points, 15 rebounds, 4 blocks and 2 steals**. His impact in the paint limited the Golden State Warriors' options. On offense, he was efficient, especially on pick-and-roll with LeBron.",
              author: "Sports Illustrated",
              date: "2024-03-18",
              category: "Player Performance",
              image: "/players/davis.jpg",
              videoUrl: "https://www.youtube.com/embed/example_davis_block"
            },
            {
              id: 3,
              title: "Lakers intense preparation for playoffs",
              content: "The team is training with increased intensity as playoffs approach. Video sessions, offensive and defensive drills, as well as strength training are on the program. The goal is clear: to be in top form for the postseason.",
              author: "ESPN",
              date: "2024-03-15",
              category: "Team News",
              image: "/players/team.jpg",
              videoUrl: null
            }
          ],
          playerStats: mockMatchesData[0].playerStats,
          calendar: mockMatchesData,
          standings: mockMatchesData[0].standings,
          matchResults: mockMatchesData.map(day => 
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
          ).flat()
        };

        setNews(mockData.news);
        setPlayerStats(mockData.playerStats);
        setCalendar(mockData.calendar);
        setStandings(mockData.standings);
        setMatchResults(mockData.matchResults);
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
