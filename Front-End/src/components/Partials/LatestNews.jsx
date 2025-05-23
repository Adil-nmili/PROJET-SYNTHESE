import React, { useState, useEffect } from 'react';
import './LatestNews.css';
import { Link, useNavigate } from 'react-router-dom';
import { NEWS } from '../../router/Router';

const LatestNews = ({ news, onArticleClick }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dupliquer les articles pour créer un effet de défilement infini
  const duplicatedNews = [...news, ...news];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % news.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [news.length]);

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Dernières Actualités</h2>
      <div className="news-container">
        <div 
          className="news-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {duplicatedNews.map((article, index) => (
            <div
              key={`${article.id}-${index}`}
              className="news-card bg-purple-50 rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 cursor-pointer"
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
                <h3 className="news-title font-bold text-lg mb-2 text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-600">
                  {article.author} • {new Date(article.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;