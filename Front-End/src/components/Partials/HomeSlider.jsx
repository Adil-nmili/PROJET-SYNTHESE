import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Play } from "lucide-react";

const HomeSlider = () => {
  const slides = [
    {
      image: "/asset/lebron-1.jpg",
      title: "A New Dynasty Awakens",
      description: "In a realm where legends wear gold and battles are fought on hardwood, the Lakers rise once more. Join the brotherhood of believers.",
      button: "Enter the Realm",

    },
    {
      image: "/asset/drapo-2.jpg",
      title: "The Chronicles of Champions",
      description: "Unearth the sacred archives of MVPs, mythical matchups, and divine buzzer-beaters. History isn't told here — it's relived.",
      button: "Enter the Realm",

    },
    {
      image: "/asset/lebron-3.jpg",
      title: "Prophecies of Purple & Gold",
      description: "From the echoes of Staples past to the roars of Crypto.com Arena, see what destiny has in store for the chosen squad.",
      button: "Read the Prophecy",
     
    },
    {
      image: "/asset/drapo-6.jpg",
      title: "Gear of the True Believers",
      description: "Only the worthy may wield the crest. Enter the sacred storehouse and claim your armor: hoodies, jerseys, and relics of the realm.",
      button: "Claim Your Gear",

    },
    {
      image: "/asset/kobe-1.jpg",
      title: "Where Heroes Ascend",
      description: "Kobe the Fearless. Magic the Wise. LeBron the Titan. Their spirits dwell in this domain, awaiting your tribute.",
      button: "Honor the Legends",

    },
  ];

  const sliderRef = useRef(null);
  const contentRefs = useRef([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slideElements = gsap.utils.toArray('.lakers-slide');
    const contents = gsap.utils.toArray('.slide-content');
    contentRefs.current = contents;

    // Set initial state
    gsap.set(slideElements, { opacity: 0, scale: 0.95 });
    gsap.set(overlayRef.current, { opacity: 0.5 });
    gsap.set(contents, { y: 50, opacity: 0 });

    // Master timeline
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    slideElements.forEach((slide, i) => {
      // Slide enter animation
      tl.to(slide, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.inOut"
      })
      .to(overlayRef.current, {
        backgroundColor: slides[i].accentColor,
        opacity: 0.4,
        duration: 1,
        ease: "sine.inOut"
      }, "<")
      .to(contents[i], {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.2)"
      }, "-=0.8")

      // Slide exit animation
      .to(slide, {
        opacity: 0,
        scale: 1.02,
        duration: 1.5,
        ease: "power1.inOut"
      }, "+=3")
      .to(contents[i], {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power1.in"
      }, "<");
    });

    return () => tl.kill();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Dark overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply"
      />

      {/* Slider container */}
      <div ref={sliderRef} className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="lakers-slide absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Content */}
            <div 
              ref={el => contentRefs.current[index] = el}
              className="slide-content absolute bottom-20 left-20 max-w-xl z-20"
            >
              <h2 className="text-5xl font-bold mb-6 text-white tracking-wide">
                {slide.title}
              </h2>
              <p className="text-lg text-[#fff] mb-8 font-light tracking-wide leading-relaxed">
                {slide.description}
              </p>
              <Button 
                className="px-10 py-6 text-lg border border-white/20 hover:border-white/40 transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span >{slide.button}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-15 right-10 z-30 text-white/50 text-sm tracking-widest">
        LAKERS KINGDOM
      </div>
      <div className="absolute bottom-10 right-10 z-30 flex space-x-4">
        {slides.map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/30"></div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;