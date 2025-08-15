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
  const [tilt, setTilt] = useState(Array(displayedCategories.length).fill({ x: 0, y: 0 }));
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
          start: "top 80%",
          toggleActions: "play none play none" // Play on enter and enterBack
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
            start: "top 85%",
            toggleActions: "play none play none" // Play on enter and enterBack
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

  const handleCardMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    gsap.to(card, {
      duration: 0.5,
      rotateX: rotateX,
      rotateY: rotateY,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardsRef.current[index];
    gsap.to(card, {
      duration: 0.8,
      rotateX: 0,
      rotateY: 0,
      ease: "elastic.out(1, 0.3)"
    });
    handleMouseLeave(index);
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full px-4 md:px-8 lg:px-16 py-20 bg-gradient-to-br from-gray-900 to-purple-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('/asset/diamond-upholstery.png')]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFAE00] opacity-10 filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">
          <span className="text-[#FFCC28]">Premium</span>
          <span className="text-white"> Collections</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {displayedCategories.map((category, index) => (
            <div
              key={category._id}
              ref={el => cardsRef.current[index] = el}
              onClick={() => handleCategoryClick(category)}
              onMouseMove={(e) => handleCardMouseMove(e, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleCardMouseLeave(index)}
              className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer h-[450px] transition-all duration-500 group glass-card"
              style={{
                opacity: hoveredCard !== null && hoveredCard !== index ? 0.7 : 1,
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-purple-900/50 z-10"></div>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover absolute inset-0 transform group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 ">
                <div className="mb-4">
                  <div className="inline-block px-5 py-2 mb-2 rounded-full bg-gradient-to-r from-[#FFCC28] to-[#FFAE00] text-black font-bold uppercase tracking-wider text-sm">
                    {category.name}
                  </div>
                </div>
                
                <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-3">Exclusive Collection</h3>
                  <p className="text-white/80 mb-6 max-w-md">
                    Discover our premium {category.name.toLowerCase()} jerseys crafted for true fans
                  </p>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#FFCC28] to-[#FFAE00] rounded-full text-black font-bold hover:opacity-90 transition-opacity">
                    <span>Explore Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-8 bg-gradient-to-r from-[#FFCC28] to-[#FFAE00] rounded-xl blur-2xl opacity-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;