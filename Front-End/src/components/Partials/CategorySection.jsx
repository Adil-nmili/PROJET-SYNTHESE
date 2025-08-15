import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Categorie from '../../../service/Categorie';
import { ALLPRODUCTS } from '../../router/Router';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function CategorySection() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Color palette
  const colors = ['#FFCC28', '#FFAE00', '#FF335F', '#A92551', '#56065D'];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Categorie.getAll();
        const allCategories = response.data;
        const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 2);
        setCategories(allCategories);
        setDisplayedCategories(selected);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        }
      });

      // Card animations
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });

        // Hover effects
        gsap.to(card, {
          scale: 1.05,
          boxShadow: `0 25px 50px -12px ${getRandomColor()}33`,
          duration: 0.4,
          paused: true,
          onStart: () => setHoveredCard(index),
          onReverseComplete: () => setHoveredCard(null)
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [displayedCategories]);

  const handleCategoryClick = (category) => {
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    navigate(ALLPRODUCTS);
  };

  const handleMouseEnter = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      boxShadow: `0 25px 50px -12px ${getRandomColor()}33`
    }).play();
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    }).play();
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full px-4 md:px-8 lg:px-16 py-20 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFAE00] opacity-10 filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <h2 className="news-heading text-5xl md:text-4xl font-bold mb-16 text-center">
          <span className="text-[#FFAE00]">Most Popular</span>{" "}
          <span className="text-[#56065D]">Categories</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {displayedCategories.map((category, index) => (
            <div
              key={category._id}
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleCategoryClick(category)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-[400px] transition-all duration-300 group"
              style={{
                border: `2px solid ${getRandomColor()}`,
                opacity: hoveredCard !== null && hoveredCard !== index ? 0.8 : 1
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                <span 
                  className="inline-block px-4 py-2 mb-4 rounded-full text-sm font-bold uppercase tracking-wider"
                  style={{ 
                    backgroundColor: getRandomColor(),
                    color: '#fff',
                    alignSelf: 'flex-start'
                  }}
                >
                  {category.name}
                </span>
                <div className="transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white/90 mb-6 line-clamp-2">
                    Explore our premium collection of {category.name.toLowerCase()} jerseys
                  </p>
                  <button className="flex items-center text-white hover:text-[#FFAE00] transition-colors">
                    <span className="mr-2">View Collection</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -inset-2 bg-[#FFAE00] rounded-xl blur-md opacity-30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;