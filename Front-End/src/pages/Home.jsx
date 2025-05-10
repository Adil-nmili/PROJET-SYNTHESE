import React from 'react';
import HomeSlider from '../components/partials/HomeSlider';
import SponsorCarousel from '../components/partials/SponsorCarousel';
import SocialMediaSlider from '../components/Partials/SocialMediaSlider';
import Newsletter from '../components/Partials/Newsletter';


function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      {/* Slider principal */}
      <HomeSlider />

      {/* Carrousel des sponsors */}
      <SponsorCarousel />

      {/* Newsletter subscription */}
      <Newsletter />

      {/* Slider des réseaux sociaux */}
      <SocialMediaSlider />
    </div>
  );
}

export default Home;
