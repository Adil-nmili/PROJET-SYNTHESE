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
  },[])

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
        <LatestNews   />
      </div>

      {/* Bannière */}
      <div className='w-full h-[200px] md:h-[300px] lg:h-[340px] bg-[url(/asset/lakers-2.jpg)] ' style={{backgroundAttachment:"fixed",backgroundSize:'cover'}}>
        {/* <img 
          src="/asset/banner.png" 
          alt="section logo" 
          className='h-full w-full object-cover'
        /> */}
      </div>

      {/* Section des catégories */}
      <CategorySection />

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
