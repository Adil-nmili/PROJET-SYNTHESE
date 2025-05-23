import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSlider from '../components/partials/HomeSlider';
import SponsorCarousel from '../components/partials/SponsorCarousel';
import SocialMediaSlider from '../components/Partials/SocialMediaSlider';
import Newsletter from '../components/Partials/Newsletter';
import LatestNews from '../components/Partials/LatestNews';
import StoreCardHome from '../components/Partials/StoreCardHome';

function Home() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Sauvegarder la catégorie sélectionnée dans le localStorage
    localStorage.setItem('selectedCategory', JSON.stringify(category));
    // Naviguer vers le composant AllCategories
    navigate('/store/categories');
  };

  const categories = [
    { id: 1, name: 'women', image: "https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400", title: "JERSEY NUMBER 23 ICONIC" },
    { id: 2, name: 'men', image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-dalton-knecht-gold-los-angeles-lakers-swingman-jersey_ss5_p-202683651+u-lj8esmxunpdwwpip2aw5+v-jx6kpehsk9oacgnw03cj.jpg?_hv=2&w=400", title: "JERSEY NUMBER 4 ICONIC" }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      {/* Slider principal */}
      <div className="w-full">
        <HomeSlider />
      </div>

      {/* Carrousel des sponsors */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <SponsorCarousel />
      </div>

      {/* Section d'actualités Lakers */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <LatestNews />
      </div>

      {/* Bannière */}
      <div className='w-full h-[200px] md:h-[300px] lg:h-[340px]'>
        <img 
          src="/asset/banner.png" 
          alt="section logo" 
          className='h-full w-full object-cover'
        />
      </div>

      {/* Section des catégories */}
      <div className='w-full px-4 md:px-8 lg:px-16 py-8 md:py-10 bg-white'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-7xl mx-auto'>
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col items-center p-4 md:p-6 rounded-xl shadow-md shadow-black hover:scale-105 transition-transform cursor-pointer group" 
              style={{ backgroundColor: "#52307c", backgroundImage: "linear-gradient(to right, rgba(107, 70, 193, 0.8), rgba(66, 39, 90, 0.9))" }}
            >
              <div className="relative overflow-hidden rounded-lg w-full">
                <img
                  src={category.image}
                  alt={`${category.name}'s Jersey`}
                  className="w-full h-48 md:h-64 object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg md:text-xl font-bold">Voir la collection</span>
                </div>
              </div>
              <p className="mt-4 text-gray-200 font-semibold text-center group-hover:text-white transition-colors">
                {category.title}
              </p>
              <strong className="text-[#7e57c2] text-[14px] md:text-[16px] mt-2 uppercase group-hover:text-[#9c7cff] transition-colors text-center" 
                style={{letterSpacing:"1px",textShadow:"1px 1px 4px #000"}}>
                {category.name}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <Newsletter />
      </div>

      {/* Slider des réseaux sociaux */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <SocialMediaSlider />
      </div>
    </div>
  );
}

export default Home;
