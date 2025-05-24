import React from 'react';

const NewsModal = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <span className="inline-block bg-purple-600 text-white text-xs px-2 py-1 rounded mb-2">
            {article.category}
          </span>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{article.title}</h2>
          <p className="text-gray-600 mb-4">
            {article.author} • {new Date(article.date).toLocaleDateString()}
          </p>
          <p className="text-gray-800 leading-relaxed">{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsModal; 