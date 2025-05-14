import React from 'react';
import HomeSlider from '../components/partials/HomeSlider';
import SponsorCarousel from '../components/partials/SponsorCarousel';
import SocialMediaSlider from '../components/Partials/SocialMediaSlider';
import Newsletter from '../components/Partials/Newsletter';
import LatestNews from '../components/Partials/LatestNews';
import StoreCardHome from '../components/Partials/StoreCardHome';


function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {/* Slider principal */}
      <HomeSlider />

      {/* Carrousel des sponsors */}
      <SponsorCarousel />

      {/* Section d'actualités Lakers */}
      <LatestNews />

      <div className='h-[340px] w-full '>
        <img src="/asset/banner.png" alt="section logo" className='h-full w-full object-cover' />
      </div>
      <div className='flex w-full justify-center gap-10 items-center bg-gradient-to-r from-purple-950 to-purple-700 py-10'>
      <div className="flex flex-col items-center p-6 rounded-xl shadow-md shadow-black hover:scale-105 transition-transform bg-gradient-to-tr from-purple-950 to-purple-700">
            <img
              src="https://fanatics.frgimages.com/los-angeles-lakers/mens-fanatics-purple-los-angeles-lakers-2025-pacific-division-champions-locker-room-t-shirt_ss5_p-202900446+u-flgeofefcekzjigunfru+v-ajz9zpt7xzw9wjkavkey.jpg?_hv=2&w=400"
              alt="Jersey"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <p className="mt-4 text-gray-200 font-semibold">JERSEY NUMBER 23 ICONIC</p>
            <strong className="text-[#7e57c2] text-[16px] mt-2 uppercase"  style={{letterSpacing:"1px",textShadow:"1px 1px 4px #000"}}  >woman</strong>
          </div>
          <div className="flex flex-col items-center p-6 rounded-xl shadow-md shadow-black hover:scale-105 transition-transform bg-gradient-to-br from-purple-950 to-purple-600">
            <img
              src="https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-dalton-knecht-gold-los-angeles-lakers-swingman-jersey_ss5_p-202683651+u-lj8esmxunpdwwpip2aw5+v-jx6kpehsk9oacgnw03cj.jpg?_hv=2&w=400"
              alt="Jersey"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <p className="mt-4 text-gray-200 font-semibold">JERSEY NUMBER 4 ICONIC</p>
            <strong className="text-[#7e57c2] text-[16px] mt-2 uppercase" style={{letterSpacing:"1px",textShadow:"1px 1px 4px #000"}}>men</strong>
          </div>
      </div>

      {/* Newsletter subscription */}
      <Newsletter />

      {/* Slider des réseaux sociaux */}
      <SocialMediaSlider />
    </div>
  );
}

export default Home;
