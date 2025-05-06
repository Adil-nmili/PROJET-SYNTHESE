import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
  const slides = [
    {
      title: "Lakers Triumph in Thrilling...",
      description: "An epic game that went down to the wire, showcasing the best of basketball.",
      image: "/images/lakers.jpeg"
    },
    {
      title: "Championship Dreams Alive",
      description: "Team shows remarkable resilience in crucial victory.",
      image: "/images/lebronJames1.jpg"
    },
    {
      title: "Star Player's Return",
      description: "Key player makes impressive comeback after injury.",
      image: "/images/lebronJames2.jpg"
    }
  ];

  return (
    <div className="pt-20 w-full">
      <div className="relative w-full flex items-center overflow-hidden h-[calc(100vh-80px)]">
        {/* Static Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-orange-400">
          <div className="absolute inset-0 bg-[url('/images/palmimage.jpg')] opacity-20 bg-repeat-x"></div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 h-10/12  flex flex-row items-center justify-between overflow-hidden ">
          <div className="text-white mb-8 w-1/2">
            <h1 className="text-[65px] font-bold mb-4 bg-gradient-to-r from-yellow-300 via-orange-500 to-purple-600 text-transparent bg-clip-text">
              BALLERS NATION
              WHERE LEGENDS
              AND FANS UNITE!
            </h1>
            <p className="text-xl text-center opacity-90 ">
              The future looks bright. Top players in the spotlight await for the player that gives the highest points in NBA basketball finals!
            </p>
          </div>

          {/* News Slider */}
          <div className="w-full h-full max-w-md">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              className="w-10/12 h-full"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className=" h-full rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {slide.title}
                      </h3>
                      <p className="text-gray-600">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Button className="absolute text-md capitalize bg-[#FDBB30] hover:bg-[#FDBB10] hover:text-black font-bold  z-50 bottom-10 shadow-md shadow-slate-800 w-[200px] h-[40px]  left-1/2 -translate-x-1/2 transition-all ease-in duration-300">
          <Link to="/about">
            Continue reading
          </Link>
        </Button>
      </div>
     </div>
  );
};

export default HomeSlider;