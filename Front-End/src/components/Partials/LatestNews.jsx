import React from 'react';
import './LatestNews.css';
import { Link } from 'react-router-dom';

// examples d'articles de news
const newsItems = [
  {
    id: 1,
    title: "Lakers Sign New Rising Star Forward",
    image: "/lakers-champions.png", 
    date: "May 10, 2025",
    trending: true,
    summary: "The Lakers have secured a promising new talent to strengthen their roster next season."
  },
  {
    id: 2,
    title: "Championship Hopes Alive: Lakers Playoff Analysis",
    image: "/images/lebronJames2.jpg", 
    date: "May 8, 2025",
    trending: true,
    summary: "Experts break down the Lakers' chances in the upcoming playoff series."
  },
  {
    id: 3,
    title: "Injury Update: Star Player Expected to Return Next Week",
    image: "/images/lakers.jpeg", 
    date: "May 7, 2025",
    trending: false,
    summary: "Good news for Lakers fans as key player nears return from injury."
  },
  {
    id: 4,
    title: "Lakers Foundation Launches New Community Initiative",
    image: "/walpaper.jpg", 
    date: "May 5, 2025",
    trending: false,
    summary: "The Lakers organization continues its commitment to giving back to the community."
  }
];

const LatestNews = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900">Lakers News & Trending</h2>
        <Link to="/news" className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold py-2 px-6 rounded-lg transition-all">
          See More
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {newsItems.map((news, index) => (
          <div key={news.id} className="news-card bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            {(index !== 1 && index !== 3) && (
              <>
                <div className="relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "/lakers.jpg";
                    }}
                  />
                  {news.trending && (
                    <div className="trending-badge absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="mr-1">🔥</span> Trending
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="news-title text-lg font-bold text-purple-900 mb-2">{news.title}</h3>
                  <p className="news-summary text-gray-600 text-sm mb-3">{news.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <Link to={`/news/${news.id}`} className="read-more-link text-yellow-500 hover:text-yellow-600 text-sm font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
              </>
            )}
            
            {(index === 1 || index === 3) && (
              <>
                <div className="p-4 pb-0">
                  <h3 className="news-title text-lg font-bold text-purple-900 mb-2">{news.title}</h3>
                  <p className="news-summary text-gray-600 text-sm mb-3">{news.summary}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <Link to={`/news/${news.id}`} className="read-more-link text-yellow-500 hover:text-yellow-600 text-sm font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
                
                <div className="relative mt-0">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-48 object-cover object-center"
                    onError={(e) => {
                      e.target.src = "/lakers.jpg";
                    }}
                  />
                  {news.trending && (
                    <div className="trending-badge absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <span className="mr-1">🔥</span> Trending
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;