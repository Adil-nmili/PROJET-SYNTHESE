import React, { useState, useEffect } from 'react';
import './LatestNews.css';
import { Link, useNavigate } from 'react-router-dom';
import { NEWS } from '../../router/Router';

<<<<<<< HEAD
const LatestNews = ({ news = [], onArticleClick }) => {
=======
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

const LatestNews = ({ news=[], onArticleClick }) => {
>>>>>>> dc8fca1a7c2b82d29f3103e5b15529a9cdcfa015
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ensure news is an array before duplicating
  const duplicatedNews = Array.isArray(news) ? [...news, ...news] : [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (news.length || 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  // If there are no news items, show a message
  if (!Array.isArray(news) || news.length === 0) {
    return (
      <section className="py-6 md:py-10 px-2 md:px-4">
        <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Latest News</h2>
        <div className="text-center text-gray-600">No news available at the moment.</div>
      </section>
    );
  }

  return (
    <section className="py-4 px-2 md:px-4">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-gray-800">Latest News</h2>
      <div className="news-container">
        <div 
          className="news-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {duplicatedNews.map((article, index) => (
            <div
              key={`${article.id}-${index}`}
              className="news-card relative bg-purple-50 rounded-lg shadow-md overflow-hidden hover:scale-[1.02] transform transition duration-300 cursor-pointer group"
              onClick={() => onArticleClick(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-32 md:h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                <div className="p-3 md:p-4 h-full flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-purple-600 text-white text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded mb-1 md:mb-2">
                    {article.category}
                  </span>
                  <h3 className="news-title font-bold text-sm md:text-lg mb-1 md:mb-2 text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white">
                    {article.author} • {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;