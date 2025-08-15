import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSlider from '@/components/Partials/HomeSlider';
import SponsorCarousel from '@/components/Partials/SponsorCarousel';
import SocialMediaSlider from '@/components/Partials/SocialMediaSlider';
import Newsletter from '@/components/Partials/Newsletter';
import LatestNews from '@/components/Partials/LatestNews';
import StoreCardHome from '@/components/Partials/StoreCardHome';
import CategorySection from '@/components/Partials/CategorySection';
import mockMatchesData from '@/data/mockMatchesData.json';
import { NEWS } from '../router/Router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();
  const [news, setNews] = useState([])

  const handleCategoryClick = (category) => {
    // Sauvegarder la catégorie sélectionnée dans le localStorage
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    // Naviguer vers le composant AllCategories
    navigate(NEWS);
  };


  useEffect(()=>{
    setNews(mockMatchesData);
    window.scrollTo(0, 0);
  },[])

  // Scroll parallax for section wrappers
  useEffect(() => {
    const sections = gsap.utils.toArray('.parallax-section');
    sections.forEach((sec) => {
      gsap.fromTo(
        sec,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  

  return (
    <div className="  w-full min-h-screen">
      {/* Slider principal */}
      <div className="w-full parallax-section will-change-transform">
        <HomeSlider />
      </div>

      {/* Carrousel des sponsors */}
      <div className="w-full parallax-section will-change-transform">
        <SponsorCarousel />
      </div>

      {/* Section d'actualités Lakers */}
      <div className="w-full h-[100vh] parallax-section will-change-transform">
        <LatestNews   />
      </div>

      {/* Bannière */}
      <div className="relative parallax-section will-change-transform w-full h-[200px] md:h-[300px] lg:h-[340px] overflow-hidden group">
        {/* Background image with parallax effect */}
        <div 
          className="absolute inset-0 bg-[url('/asset/drapo-1.jpg')] bg-fixed bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundAttachment: "fixed",
            backgroundSize: "cover"
          }}
        >
          {/* Dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content with fade-in animation */}
        <div className="relative z-10 flex  backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex-col items-center justify-center h-full text-center text-white px-4 transform translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-wide">EXCLUSIVE LAKERS COLLECTION</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl font-light">Premium apparel for the discerning fan</p>
          <button className="bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition duration-300 px-8 py-3 rounded-sm font-medium tracking-wider">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Section des catégories */}
      <div className="parallax-section will-change-transform">
        <CategorySection />
      </div>

      {/* Newsletter subscription */}
      <div className="w-full parallax-section will-change-transform">
        <Newsletter />
      </div>

      {/* Slider des réseaux sociaux */}
      <div className="w-full bg-[#FAFAFA] parallax-section will-change-transform">
        <SocialMediaSlider />
      </div>
    </div>
  );
}

export default Home;
