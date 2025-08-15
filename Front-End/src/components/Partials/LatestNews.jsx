import  { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/button';
import {NEWS} from '../../router/Router'
import './LatestNews.css'
import {  useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const LatestNews = () => {
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const newsRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  const [newsItems, setNewItems] = useState([
    {
      id: 1,
      title: "Lakers Sign Top Draft Pick",
      image: "/lakersTeams.jpg",
      date: "Aug 15, 2025",
      category: "Roster Move",
      summary: "The Purple & Gold secure a promising young talent to bolster their championship aspirations."
    },
    {
      id: 2,
      title: "LeBron Extends Contract",
      image: "/images/lebronjames3.jpeg",
      date: "Aug 12, 2025",
      category: "Breaking",
      summary: "The King commits to 2 more years in Los Angeles, chasing his fifth championship."
    },
    {
      id: 3,
      title: "New Jersey Collection Unveiled",
      image: "/players/Pau Gasol.jpg",
      date: "Aug 10, 2025",
      category: "Merchandise",
      summary: "The 2025-26 City Edition jerseys pay homage to Showtime era legends."
    },
    {
      id: 4,
      title: "Arena Upgrades Complete",
      image: "/players.jpg",
      date: "Aug 8, 2025",
      category: "Facilities",
      summary: "$100M renovation brings cutting-edge technology to the Lakers' home court."
    }
  ]) ;

  // GSAP animations

// Initialize GSAP animations
useEffect(() => {
const ctx = gsap.context(() => {
  // Base animations
  gsap.set(cardsRef.current, {
    opacity: 0,
    y: 50
  });

  gsap.to(cardsRef.current, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
  });

  // Auto-rotation timeline
  const rotationTL = gsap.timeline({ 
    repeat: -1,
    paused: isHovered
  });

  cardsRef.current.forEach((card, index) => {
    rotationTL.to(card, {
      opacity: index === activeCard ? 1 : 0.6,
      scale: index === activeCard ? 1.05 : 0.95,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => !isHovered && setActiveCard((index + 1) % newsItems.length)
    }, `+=${index === 0 ? 3 : 0}`);
  });

}, containerRef);

return () => ctx.revert();
}, [activeCard, isHovered]);

const handleCardHover = (index) => {
setIsHovered(true);
setActiveCard(index);

gsap.to(cardsRef.current, {
  opacity: (i) => i === index ? 1 : 0.7,
  scale: (i) => i === index ? 1.03 : 0.97,
  duration: 0.3
});
};

const handleCardLeave = () => {
setIsHovered(false);

gsap.to(cardsRef.current, {
  opacity: (i) => i === activeCard ? 1 : 0.6,
  scale: (i) => i === activeCard ? 1.05 : 0.95,
  duration: 0.5
});
};

  // Color generator from palette
  const getAccentColor = (index) => {
    const colors = ["#FFCC28", "#FFAE00", "#FF335F", "#A92551", "#56065D"];
    return colors[index % colors.length];
  };

  return (
    <section 
      ref={componentRef}
      className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="news-heading text-5xl md:text-4xl font-bold mb-16 text-center">
          <span className="text-[#FFAE00]">LATEST</span>{" "}
          <span className="text-[#56065D]">LAKERS NEWS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => newsRefs.current[index] = el}
              className="news-card relative group overflow-hidden rounded-xl h-[400px] transition-all duration-300"
              style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: `1px solid ${getAccentColor(index)}`
              }}
              onClick={() => navigate(`/news/${item.id}`)}
            >
              {/* Image with gradient overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                <span 
                  className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{ backgroundColor: getAccentColor(index) }}
                >
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFAE00] text-xs">
                    {item.date}
                  </span>
                  <button className="text-white hover:text-[#FFAE00] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 16 16 12 12 8"></polyline>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Active state indicator */}
              {activeIndex === index && (
                <div className="absolute top-4 right-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFAE00] rounded-full animate-ping opacity-75"></div>
                    <div className="relative w-3 h-3 bg-[#FFAE00] rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
          onClick={ () => navigate(NEWS)}
            className="px-10 py-5 text-lg font-bold uppercase tracking-wider border-2 border-[#FFAE00] hover:bg-[#FFAE00] hover:text-black transition-all duration-300 group"
            variant="ghost"
          >
           
            <span className="relative overflow-hidden">
              <span className="block group-hover:-translate-y-full transition-transform duration-300">View All News</span>
              <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                
                Explore More
              </span>
            </span>
            
          </Button>
        </div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#56065D] opacity-20 filter blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#FFAE00] opacity-20 filter blur-3xl"></div>
    </section>
  );
};

export default LatestNews;