import React from 'react';
import './LatestNews.css';
import { Link, useNavigate } from 'react-router-dom';
import { NEWS } from '../../router/Router';
import { Button } from '../ui/button';

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

const LatestNews = ({ news, onArticleClick }) => {
  const navigate = useNavigate();
  const handleSeeMore = () => {
    navigate(NEWS);
  };

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Dernières Actualités</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <div
            key={article.id}
            className="bg-purple-50 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
            onClick={() => onArticleClick(article)}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded mb-2">
                {article.category}
              </span>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{article.title}</h3>
              <p className="text-sm text-gray-600">
                {article.author} • {new Date(article.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;