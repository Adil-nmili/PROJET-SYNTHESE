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
    <div className="flex flex-col items-center justify-center w-full">
      {/* Slider principal */}
      <HomeSlider />

      {/* Carrousel des sponsors */}
      <SponsorCarousel />

      {/* Section d'actualités Lakers */}
      <LatestNews />

      <div className='h-[340px] w-full'>
        <img src="/asset/banner.png" alt="section logo" className='h-full w-full object-cover' />
      </div>

      {/* Section des catégories */}
      <div className='flex w-full justify-center gap-10 items-center py-10 bg-white'>
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="flex flex-col items-center p-6 rounded-xl shadow-md shadow-black hover:scale-105 transition-transform cursor-pointer group" 
            style={{ backgroundColor: "#52307c", backgroundImage: "linear-gradient(to right, rgba(107, 70, 193, 0.8), rgba(66, 39, 90, 0.9))" }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={`${category.name}'s Jersey`}
                className="w-64 h-64 object-cover rounded-lg group-hover:scale-110 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-bold">Voir la collection</span>
              </div>
            </div>
            <p className="mt-4 text-gray-200 font-semibold group-hover:text-white transition-colors">{category.title}</p>
            <strong className="text-[#7e57c2] text-[16px] mt-2 uppercase group-hover:text-[#9c7cff] transition-colors" style={{letterSpacing:"1px",textShadow:"1px 1px 4px #000"}}>
              {category.name}
            </strong>
          </div>
        ))}
      </div>

      {/* Newsletter subscription */}
      <Newsletter />

      {/* Slider des réseaux sociaux */}
      <SocialMediaSlider />
    </div>
  );
}

export default Home;
