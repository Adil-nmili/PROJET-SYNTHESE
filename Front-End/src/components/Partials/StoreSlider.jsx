import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ABOUT } from "../../router/Router";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "../ui/button";

const StoreSlider = () => {
  const slides = [
    {
      title: "Lakers Triumph in Thrilling...",
      description:
        "An epic game that went down to the wire, showcasing the best of basketball.",
      image: "/images/lakers.jpeg",
    },
    {
      title: "Championship Dreams Alive",
      description: "Team shows remarkable resilience in crucial victory.",
      image: "/images/lebronJames1.jpg",
    },
    {
      title: "Star Player's Return",
      description: "Key player makes impressive comeback after injury.",
      image: "/images/lebronJames2.jpg",
    },
  ];

  return (
<div className="pt-20 w-11/12 mx-auto">
      <div className="relative w-full overflow-hidden h-[calc(80vh-80px)]">
        {/* Static Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-orange-400">
          <div className="absolute inset-0 bg-[url('/images/palmimage.jpg')] opacity-20 bg-repeat-x"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 h-full flex flex-row items-center justify-between">
          <div className="text-white mb-8 w-1/2">
            <h1 className="text-[70px] font-bold mb-4 text-black">
            Buy your dream LAKERS item
            </h1>
            <p className="text-xl text-center opacity-90 ">
              The future looks bright. Top players in the spotlight await for
              the player that gives the highest points in NBA basketball finals!
            </p>
          </div>

          {/* News Slider */}
          <div className="w-full max-w-md">
            <Swiper
              modules={[Navigation, Pagination, Autoplay,EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              effect="fade"
            //   navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className=" h-[400px]  rounded-l-full rounded-tr-full  overflow-hidden ">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] object-cover rounded-l-full rounded-tr-full shadow-2xl"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-gray-600">{slide.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Button className="absolute text-xl capitalize bg-[#FDBB30] hover:bg-[#FDBB10] hover:text-black font-bold  z-50 bottom-10 w-[300px] h-[50px]  left-1/2 -translate-x-1/2 ">
          <Link to={ABOUT}>Continue reading</Link>
        </Button>
      </div>
    </div>
  );
};

export default StoreSlider;
