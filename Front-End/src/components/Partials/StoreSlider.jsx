import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import CountUp from 'react-countup';
import "swiper/css";
import "swiper/css/effect-fade";

const StoreSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { number: "50+", label: "JERSEYS" },
    { number: "100+", label: "Customers" },
    { number: "25+", label: "Accessories" },
  ];

  const slides = [
    {
      title: "Lakers Triumph in Thrilling...",
      description: "An epic game that went down to the wire, showcasing the best of basketball.",
      image: "/asset/product1.png",
    },
    {
      title: "Championship Dreams Alive",
      description: "Team shows remarkable resilience in crucial victory.",
      image: "/asset/product2.webp",
    },
    {
      title: "Star Player's Return",
      description: "Key player makes impressive comeback after injury.",
      image: "/asset/product3.webp",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <section 
      className={`relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] p-8 md:p-16  shadow-2xl overflow-hidden mt-12 w-full  transition-opacity duration-1000 flex items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('/asset/diamond-upholstery.png')] opacity-5"></div>
      </div>
      
      {/* Gold accent border */}
      <div className="absolute inset-0 border border-[#D4AF37]/30  pointer-events-none"></div>
      
      {/* Text Section */}
      <div className="relative z-10 text-white md:w-1/2 w-full mb-10 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 animate-fade-in-up">
          Elevate Your <span className="text-[#D4AF37]">Game</span>
        </h1>
        
        <div className="grid grid-cols-2 md:flex gap-6 md:gap-10 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <p className="text-xl md:text-2xl font-bold text-[#D4AF37]">
                <CountUp 
                  start={0} 
                  end={parseInt(stat.number)} 
                  duration={3} 
                  separator="," 
                />+
              </p>
              <p className="text-sm text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex items-center bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 w-full max-w-md border border-[#D4AF37]/30 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <input
            type="text"
            placeholder="Find your perfect Lakers gear..."
            className="flex-1 text-white placeholder-gray-400 bg-transparent outline-none"
          />
          <button className="bg-[#D4AF37] p-2 rounded-lg text-black hover:bg-[#c19d30] transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="relative z-10 md:w-1/2 w-full flex flex-col gap-4 justify-center items-center mt-12 md:mt-0 animate-scale-in" style={{ animationDelay: "700ms" }}>
        <div className="w-full max-w-3xl h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30">
          <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSlideChange={handleSlideChange}
            className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={`relative w-full h-full  `}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover absolute inset-0 top-0 left-0 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute bottom-0 left-0 h-full flex flex-col justify-end right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
         
          
        </div>
         {/* Custom pagination */}
          <div className="flex justify-center mt-1 space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide ? "bg-[#D4AF37] w-8" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
      </div>
      
      {/* Floating text */}
      <div className="absolute top-8 right-8 rotate-12">
        <div className="text-[#D4AF37] font-bold text-lg tracking-widest opacity-80">
          EXCLUSIVE
        </div>
      </div>

      
    </section>
  );
};

export default StoreSlider;