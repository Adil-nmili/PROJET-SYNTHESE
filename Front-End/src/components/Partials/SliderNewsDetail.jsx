import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SliderNewsDetail = ({ images }) => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={isAutoPlaying ? {
          delay: 3000,
          disableOnInteraction: false,
        } : false}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} w-3 h-3 bg-white/50 hover:bg-white/75"></span>`;
          },
        }}
        className="h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="min-w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-4 md:p-8">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">{image.title}</h2>
                <p className="text-base md:text-xl text-center max-w-2xl">{image.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
          aria-label={isAutoPlaying ? "Pause" : "Play"}
        >
          {isAutoPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.25) !important;
        }
        .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.75) !important;
        }
      `}</style>
    </div>
  );
};

export default SliderNewsDetail; 