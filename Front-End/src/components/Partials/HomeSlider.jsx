import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";

const HomeSlider = () => {
  const slides = [
    {
      image: "/asset/lebron-1.jpg",
      Title: "A New Dynasty Awakens",
      Subtitle:
        "In a realm where legends wear gold and battles are fought on hardwood, the Lakers rise once more. Join the brotherhood of believers.",
      Button: "Enter the Realm",
    },
    {
      image: "/asset/drapo-2.jpg",
      Title: "The Chronicles of Champions",
      Subtitle:
        " Unearth the sacred archives of MVPs, mythical matchups, and divine buzzer-beaters. History isn’t told here — it’s relived.",
      Button: "Enter the Realm",
    },
    {
      image: "/asset/lebron-3.jpg",
      Title: "Prophecies of Purple & Gold",
      Subtitle:
        " From the echoes of Staples past to the roars of Crypto.com Arena, see what destiny has in store for the chosen squad.",
      Button: "Read the Prophecy",
    },
    {
      image: "/asset/drapo-6.jpg",
      Title: "Gear of the True Believers",
      Subtitle:
        "Only the worthy may wield the crest. Enter the sacred storehouse and claim your armor: hoodies, jerseys, and relics of the realm.",
      Button: "Claim Your Gear",
    },
    {
      image: "/asset/kobe-1.jpg",
      Title: "Where Heroes Ascend",
      Subtitle:
        "Kobe the Fearless. Magic the Wise. LeBron the Titan. Their spirits dwell in this domain, awaiting your tribute.",
      Button: "Honor the Legends",
    },
  ];

  return (
    <div className="w-full h-screen overflow-hidden ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        direction="vertical"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        translate="ease-out"
        className="w-full h-full "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img src={slide.image} className="h-full  w-full object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10 flex justify-center items-center flex-col gap-10">
              <h1 className="text-[70px] font-bold  text-[#FDBB30] italic">{slide.Title}</h1>
              <p className="text-2xl text-center w-2/3 font-bold text-gray-200 ">{slide.Subtitle}</p>
              <Button className="text-xl py-2 h-fit font-semibold">{slide.Button}</Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
