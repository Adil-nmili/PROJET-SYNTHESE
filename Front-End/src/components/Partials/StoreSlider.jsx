import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { ABOUT } from "../../router/Router";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Button } from "../ui/button";
import CountUp from 'react-countup';


const StoreSlider = () => {
  const stats = [
    { number: "50+", label: "JERSEYS" },
    { number: "100+", label: "Customers" },
    { number: "25+", label: "Accessories" },
    // tu peux ajouter autant que tu veux ici
  ];
  const slides = [
    {
      title: "Lakers Triumph in Thrilling...",
      description:
        "An epic game that went down to the wire, showcasing the best of basketball.",
      image: "https://lakersstore.com/cdn/shop/files/LAK103BCR0BLK-YELreverse_1.jpg?v=1738876959&width=1080",
    },
    {
      title: "Championship Dreams Alive",
      description: "Team shows remarkable resilience in crucial victory.",
      image: "https://lakersstore.com/cdn/shop/files/mitchell-and-ness-los-angeles-lakers-team-logo-duffle-bag_pi5334000_altimages_ff_5334988-9e224e551efa19c51bdcalt2_full.png?v=1733874739&width=540",
    },
    {
      title: "Star Player's Return",
      description: "Key player makes impressive comeback after injury.",
      image: "https://lakersstore.com/cdn/shop/files/109834.jpg?v=1697661527&width=540",
    },
  ];

  return (
    <section className="bg-[#7e57c2] p-20 mt-20 rounded-2xl shadow-xl w-11/12 mx-auto  overflow-hidden relative flex flex-col md:flex-row items-center justify-between">
      {/* Text Section */}
      <div className="text-black md:w-1/2 w-full mb-10 md:mb-0">
        <h1 className="text-3xl font-extrabold mb-6">
          Buy your <br /> dream LAKERS item
        </h1>
        <div className="flex items-center gap-8 mb-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-xl font-bold text-white">
              <CountUp start={0} end={parseInt(stat.number)} duration={10} separator="," />+
            </p>
            <p className="text-sm text-white">{stat.label}</p>
          </div>
        ))}
</div>

        {/* Search bar */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-xs">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="flex-1 text-black placeholder-gray-400 bg-transparent outline-none"
          />
          <button className="text-purple-600">
            🔍
          </button>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="relative md:w-1/2 w-full flex justify-center items-center">
        <div className="bg-black rounded-full w-[320px] h-[320px] flex items-center justify-center overflow-hidden relative rounded-br-none">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectFade]}
            slidesPerView={1}
            effect="fade"
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-full h-full"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  {/* Première flèche animée */}
        <img
          src={'/asset/flech.png'}
          alt="Arrow"
          className="absolute z-10 right-0 top-0 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-bounce"
        />

        {/* Deuxième flèche retournée et animée */}
        <img
          src={'/asset/flech.png'}
          alt="Arrow Rotated"
          className="absolute z-10 left-0 bottom-0 transform -translate-x-1/2 -translate-y-1/2 rotate-180 w-28 h-28 animate-bounce"
        />
      </div>
    </section>
  );
};

export default StoreSlider;
