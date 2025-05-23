import { useState, useEffect } from 'react';
// import { fetchNBAData, fetchTeamStats, fetchGameSchedule, fetchStandings, testAPIEndpoints } from '../../api/newsApi';
// import axios from 'axios';
// import { BalldontlieAPI } from '@balldontlie/sdk'

// const api = new BalldontlieAPI({ apiKey: "089c997c-1837-477c-a848-879ae7c5f8f2" });

// Placeholder data structure based on the image layout
// In a real application, this data would come from an API
const placeholderNews = [
  {
    id: 1,
    title: "Ravens defense holds up the right defense against strong birds team and chargers",
    image: "/placeholder-news-1.jpg", // Placeholder image path - replace with actual image URLs
    date: "May 10, 2025",
    author: "John Doe",
    summary: "A summary of the article goes here. This is a longer summary to test the line clamping.",
    url: "#" // Replace with actual article URL
  },
  {
    id: 2,
    title: "Training camp preview: Rookies under the radar entering qualifiers",
    image: "/placeholder-news-2.jpg",
    date: "May 8, 2025",
    author: "Jane Smith",
    summary: "Another summary of the article. This summary is also a bit longer to see how it wraps.",
    url: "#"
  },
  {
    id: 3,
    title: "Placeholder Headline Three: Important Updates",
    image: "/placeholder-news-3.jpg",
    date: "May 7, 2025",
    author: "Author Name",
    summary: "Summary for article three, covering some key points.",
    url: "#"
  },
  {
    id: 4,
    title: "Placeholder Headline Four: Game Analysis",
    image: "/placeholder-news-4.jpg",
    date: "May 5, 2025",
    author: "Author Name",
    summary: "Summary for article four, diving into game specifics.",
    url: "#"
  },
  // Add more placeholder articles to fill the layout sections
  { id: 5, title: "Another Article on Team Performance", image: "/placeholder-news-5.jpg", date: "May 4, 2025", author: "Author Name", summary: "Summary about team performance and stats.", url: "#" },
  { id: 6, title: "Yet Another Article: Player Spotlight", image: "/placeholder-news-6.jpg", date: "May 3, 2025", author: "Author Name", summary: "Summary focusing on a specific player's achievements.", url: "#" },
  { id: 7, title: "News Item Seven: Injury Report", image: "/placeholder-news-7.jpg", date: "May 2, 2025", author: "Author Name", summary: "Latest updates on player injuries.", url: "#" },
  { id: 8, title: "News Item Eight: Upcoming Events", image: "/placeholder-news-8.jpg", date: "May 1, 2025", author: "Author Name", summary: "Details about upcoming games and events.", url: "#" },
  { id: 9, title: "News Item Nine: Off-Season Moves", image: "/placeholder-news-9.jpg", date: "April 30, 2025", author: "Author Name", summary: "Analyzing recent team changes.", url: "#" },
  { id: 10, title: "News Item Ten: Historical Moments", image: "/placeholder-news-10.jpg", date: "April 29, 2025", author: "Author Name", summary: "Looking back at memorable moments.", url: "#" },
  { id: 11, title: "News Item Eleven: Fan Zone Updates", image: "/placeholder-news-11.jpg", date: "April 28, 2025", author: "Author Name", summary: "News relevant to the fans.", url: "#" },
  { id: 12, title: "News Item Twelve: League News", image: "/placeholder-news-12.jpg", date: "April 27, 2025", author: "Author Name", summary: "General news from the league.", url: "#" },
  { id: 13, title: "News Item Thirteen", image: "/placeholder-news-13.jpg", date: "April 26, 2025", author: "Author Name", summary: "More news to fill the page.", url: "#" },
  { id: 14, title: "News Item Fourteen", image: "/placeholder-news-14.jpg", date: "April 25, 2025", author: "Author Name", summary: "Even more news...", url: "#" },
];

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching data with a delay
    // Replace this setTimeout with your actual API call later
    setTimeout(() => {
      // In a real scenario, you would process the API response here
      // and structure it to match the { title, image, date, author, summary, url } format
      setNews(placeholderNews);
      setLoading(false);
    }, 1000);

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  // Assuming the first article in the data is the featured one
  const featuredArticle = news[0];
  // Get the rest of the articles
  const otherArticles = news.slice(1);

  return (
    // The main container with padding and background color matching the image
    <div className="container mx-auto px-4 py-8 bg-purple-900 text-gray-100">

      {/* Featured Article Section (Top part of the image) */}
      {featuredArticle && (
        <div className="mb-12 bg-red-600 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
          {/* Featured Image */}
          <img
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className="w-full md:w-1/2 object-cover h-64 md:h-auto"
          />
          {/* Featured Article Content */}
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4">{featuredArticle.title}</h2>
            <p className="text-gray-200 mb-4">{featuredArticle.summary}</p>
            <div className="flex items-center text-sm text-gray-300 mb-4">
              <span>{featuredArticle.author}</span>
              <span className="mx-2">•</span>
              <span>{featuredArticle.date}</span>
            </div>
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 text-purple-900 font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
              Read More
            </a>
          </div>
        </div>
      )}

      {/* Grid Section 1 (Below Featured Article) */}
      {/* This grid has 3 columns on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Display the next 3 articles */}
        {otherArticles.slice(0, 3).map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-900 hover:shadow-xl transition-shadow duration-300">
            {/* Article Image */}
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            {/* Article Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-700 text-sm line-clamp-3 mb-3">{article.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

       {/* Placeholder Banner/Ad Section (Based on the image) */}
       <div className="w-full bg-gray-800 text-white text-center py-8 mb-12 rounded-lg">
            <h2 className="text-2xl font-bold">[ Placeholder Banner Area ]</h2>
            <p className="mt-2 text-gray-400">Advertisement or special content goes here</p>
       </div>

      {/* Grid Section 2 (Another grid below the banner) */}
      {/* This grid appears to have 4 columns on larger screens in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Display the next 4 articles */}
        {otherArticles.slice(3, 7).map((article) => (
           <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-900 hover:shadow-xl transition-shadow duration-300">
           {/* Article Image */}
           {article.image && (
             <img
               src={article.image}
               alt={article.title}
               className="w-full h-40 object-cover"
             />
           )}
           {/* Article Content */}
           <div className="p-4">
             <h3 className="text-md font-semibold mb-2 line-clamp-2">{article.title}</h3>
             <p className="text-gray-700 text-sm line-clamp-3 mb-3">{article.summary}</p>
             <div className="flex justify-between items-center text-xs text-gray-600">
               <span>{article.author}</span>
               <span>{article.date}</span>
             </div>
           </div>
         </div>
        ))}
      </div>

      {/* Grid Section 3 (More articles, potentially similar to Grid 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Display the next 4 articles */}
        {otherArticles.slice(7, 11).map((article) => (
           <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-900 hover:shadow-xl transition-shadow duration-300">
           {/* Article Image */}
           {article.image && (
             <img
               src={article.image}
               alt={article.title}
               className="w-full h-40 object-cover"
             />
           )}
           {/* Article Content */}
           <div className="p-4">
             <h3 className="text-md font-semibold mb-2 line-clamp-2">{article.title}</h3>
             <p className="text-gray-700 text-sm line-clamp-3 mb-3">{article.summary}</p>
             <div className="flex justify-between items-center text-xs text-gray-600">
               <span>{article.author}</span>
               <span>{article.date}</span>
             </div>
           </div>
         </div>
        ))}
      </div>

      {/* See More Button - if needed */}
      {/* You might link this to another page with all news */}
      <div className="text-center mt-8">
         <button className="bg-yellow-500 text-purple-900 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors">
            See More News
         </button>
      </div>

      {/* Subscribe Section (Bottom part of the image) */}
       <div className="w-full text-center py-20 mt-12 bg-gray-900 rounded-lg">
            <h2 className="text-4xl font-bold text-white mb-6">SUBSCRIBE</h2>
            {/* Placeholder for subscribe form - replace with actual form implementation */}
            <div className="flex justify-center">
                <input type="email" placeholder="Enter your email" className="p-3 rounded-l-md focus:outline-none text-gray-900" />
                <button className="bg-yellow-500 text-gray-900 p-3 rounded-r-md font-semibold hover:bg-yellow-600 transition-colors">Subscribe</button>
            </div>
       </div>

    </div>
  );
};

export default NewsPage; 