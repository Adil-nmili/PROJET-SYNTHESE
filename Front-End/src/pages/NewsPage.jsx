import React, { useState, useEffect } from 'react';
import NewsSlider from '@/components/Partials/NewsSlider'; 
import MatchResults from '@/components/Partials/MatchResults';
import LatestNews from '@/components/Partials/LatestNews';
import PlayerStats from '@/components/Partials/PlayerStats';
import MatchCalendar from '@/components/Partials/MatchCalendar';
import Standings from '@/components/Partials/Standings';
import Videos from '@/components/Partials/Videos';
import NewsModal from '@/components/Partials/NewsModal';

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
        // Données simulées enrichies avec plus d'informations
        const mockData = {
          
          news: [
            {
              id: 1,
              title: "LeBron James mène les Lakers à une victoire spectaculaire contre les Celtics",
              content: "Dans un match palpitant, LeBron James a livré une performance magistrale, dominant avec **35 points, 10 rebonds, 8 passes décisives et 2 interceptions**. Les Lakers ont surmonté un déficit de 15 points pour s'imposer face à leurs rivaux historiques, les Boston Celtics. La cohésion de l'équipe en fin de match a été déterminante.",
              author: "NBA News",
              date: "2024-03-20",
              category: "Match Highlights",
              image: "/players/lebron.jpg",
              videoUrl: "https://www.youtube.com/embed/example_lebron_highlight"
            },
            {
              id: 2,
              title: "Anthony Davis, muraille sous le panier face aux Warriors",
              content: "Anthony Davis a été le pilier défensif des Lakers, enregistrant **28 points, 15 rebonds, 4 contres et 2 interceptions**. Son impact dans la raquette a limité les options des Golden State Warriors. En attaque, il a été efficace, notamment sur pick-and-roll avec LeBron.",
              author: "Sports Illustrated",
              date: "2024-03-18",
              category: "Player Performance",
              image: "/players/davis.jpg",
              videoUrl: "https://www.youtube.com/embed/example_davis_block"
            },
            {
              id: 3,
              title: "Préparation intense des Lakers pour les playoffs",
              content: "L'équipe s'entraîne avec une intensité accrue à l'approche des playoffs. Les séances vidéo, les drills offensifs et défensifs, ainsi que le renforcement musculaire sont au programme. L'objectif est clair : être au meilleur de sa forme pour la post-saison.",
              author: "ESPN",
              date: "2024-03-15",
              category: "Team News",
              image: "/players/team.jpg",
              videoUrl: null
            }
          ],
          playerStats: [
            {
              id: 1,
              name: "LeBron James",
              points: 25.7,
              rebounds: 7.3,
              assists: 8.1,
              steals: 1.3,
              blocks: 0.6,
              efficiency: 26.5,
              image: "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png",
              details: "LeBron James est un ailier polyvalent, connu pour sa vision du jeu exceptionnelle et sa capacité à marquer et distribuer. Il est un leader sur le terrain."
            },
            {
              id: 2,
              name: "Anthony Davis",
              points: 24.8,
              rebounds: 12.5,
              assists: 3.4,
              steals: 1.2,
              blocks: 2.3,
              efficiency: 27.1,
              image: "https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png",
              details: "Anthony Davis est un intérieur dominant, excellent rebondeur et contreur. Son jeu offensif s'est considérablement amélioré."
            },
            {
              id: 3,
              name: "Austin Reaves",
              points: 15.2,
              rebounds: 4.1,
              assists: 4.8,
              steals: 0.9,
              blocks: 0.3,
              efficiency: 17.5,
              image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1630559.png",
              details: "Austin Reaves est un arrière prometteur, connu pour son sang-froid dans les moments clés et sa capacité à scorer et à créer du jeu."
            }
          ],
          calendar: [
            {
              id: 1,
              opponent: "Celtics",
              date: "2024-03-25",
              time: "19:30",
              venue: "Home",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/bos.png",
              matchupDetails: "Match à domicile très attendu contre les rivaux de Boston. Enjeu important pour le classement."
            },
            {
              id: 2,
              opponent: "Warriors",
              date: "2024-03-27",
              time: "20:00",
              venue: "Away",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/gs.png",
              matchupDetails: "Déplacement à Golden State pour affronter les Warriors. Un test majeur face à une équipe de l'Ouest."
            }
          ],
          standings: [
            {
              id: 1,
              team: "Thunder",
              wins: 68,
              losses: 14,
              percentage: .829,
              conference: "Ouest",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/okc.png"
            },
            {
              id: 2,
              team: "Rockets",
              wins: 52,
              losses: 30,
              percentage: .634,
              conference: "Ouest",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/hou.png"
            },
            {
              id: 3,
              team: "Lakers",
              wins: 50,
              losses: 32,
              percentage: .610,
              conference: "Ouest",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png"
            },
            {
              id: 4,
              team: "Nuggets",
              wins: 50,
              losses: 32,
              percentage: .610,
              conference: "Ouest",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/den.png"
            },
             {
              id: 5,
              team: "Clippers",
              wins: 50,
              losses: 32,
              percentage: .610,
              conference: "Ouest",
              image: "https://a.espncdn.com/i/teamlogos/nba/500/lac.png"
            }
          ],
          matchResults: [
            {
              id: 1,
              homeTeam: "Lakers",
              homeScore: 96,
              awayTeam: "Timberwolves",
              awayScore: 103,
              date: "2024-05-01",
              status: "Terminé",
              series: "MIN mène 4 à 1",
              homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
              awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
              matchSummaryUrl: "#"
            },
            {
              id: 2,
              homeTeam: "Timberwolves",
              homeScore: 116,
              awayTeam: "Lakers",
              awayScore: 113,
              date: "2024-04-27",
              status: "Terminé",
              series: "MIN mène 3 à 1",
              homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
              awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
              matchSummaryUrl: "#"
            },
            {
              id: 3,
              homeTeam: "Timberwolves",
              homeScore: 116,
              awayTeam: "Lakers",
              awayScore: 104,
              date: "2024-04-26",
              status: "Terminé",
              series: "MIN mène 2 à 1",
              homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
              awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
               matchSummaryUrl: "#"
            },
             {
              id: 4,
              homeTeam: "Lakers",
              homeScore: 94,
              awayTeam: "Timberwolves",
              awayScore: 85,
              date: "2024-04-23",
              status: "Terminé",
              series: "Match nul 1 à 1",
              homeImage: "https://a.espncdn.com/i/teamlogos/nba/500/lal.png",
              awayImage: "https://a.espncdn.com/i/teamlogos/nba/500/min.png",
              matchSummaryUrl: "#"
            }
          ]
        };

        setNews(mockData.news);
        setPlayerStats(mockData.playerStats);
        setCalendar(mockData.calendar);
        setStandings(mockData.standings);
        setMatchResults(mockData.matchResults);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  // Filtrer les actualités qui ont une URL de vidéo
  const videos = news.filter(item => item.videoUrl);

  return (
    <div className="min-h-screen bg-white">
      <NewsSlider news={news} />
      <MatchResults matchResults={matchResults} />
      <LatestNews news={news} onArticleClick={setSelectedArticle} />
      <PlayerStats playerStats={playerStats} />
      <MatchCalendar calendar={calendar} />
      <Standings standings={standings} />
      <Videos videos={videos} />
      <NewsModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};

export default NewsPage;
