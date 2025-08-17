import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const NBANewsHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    stats: false,
    news: false,
    players: false,
    standings: false, // New section
    leaders: false,   // New section
    highlights: false
  });
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const newsRef = useRef([]);
  const playersRef = useRef([]);
  const standingsRef = useRef(null); // New section
  const leadersRef = useRef(null);   // New section
  const highlightsRef = useRef(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return () => clearTimeout(timer);
  }, []);

  // Initialize animations when loading completes
  useEffect(() => {
    if (!isLoading) {
      initAnimations();
    }
  }, [isLoading]);

  // State-controlled GSAP animations
  const initAnimations = () => {
    // Hero section parallax
    // gsap.to(heroRef.current, {
    //   scrollTrigger: {
    //     trigger: heroRef.current,
    //     start: "top top",
    //     end: "bottom top",
    //     scrub: true,
    //     onEnter: () => setVisibleSections(prev => ({...prev, hero: true})),
    //     onLeaveBack: () => setVisibleSections(prev => ({...prev, hero: false}))
    //   },
    //   y: 100,
    // });

    // Stats counter animations
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      
      let current = 0;
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        }
      };
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          setVisibleSections(prev => ({...prev, stats: true}));
          current = 0;
          updateCounter();
        },
        onLeaveBack: () => setVisibleSections(prev => ({...prev, stats: false})),
        once: true
      });
    });

    // News card animations
    newsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            if (index === 0) setVisibleSections(prev => ({...prev, news: true}));
          },
          onLeaveBack: () => {
            if (index === 0) setVisibleSections(prev => ({...prev, news: false}));
          }
        }
      });
    });

    // Player card animations
    playersRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          onEnter: () => {
            if (index === 0) setVisibleSections(prev => ({...prev, players: true}));
          },
          onLeaveBack: () => {
            if (index === 0) setVisibleSections(prev => ({...prev, players: false}));
          }
        }
      });
    });

    // Standings section
    ScrollTrigger.create({
      trigger: standingsRef.current,
      start: "top 80%",
      onEnter: () => setVisibleSections(prev => ({...prev, standings: true})),
      onLeaveBack: () => setVisibleSections(prev => ({...prev, standings: false}))
    });

    // Leaders section
    ScrollTrigger.create({
      trigger: leadersRef.current,
      start: "top 80%",
      onEnter: () => setVisibleSections(prev => ({...prev, leaders: true})),
      onLeaveBack: () => setVisibleSections(prev => ({...prev, leaders: false}))
    });

    // Highlights section
    ScrollTrigger.create({
      trigger: highlightsRef.current,
      start: "top 80%",
      onEnter: () => setVisibleSections(prev => ({...prev, highlights: true})),
      onLeaveBack: () => setVisibleSections(prev => ({...prev, highlights: false}))
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  };

  // Section fade-in animations based on state
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
          <div className="relative">
            <div className="w-24 h-24 border-t-4 border-[#552582] border-r-4 border-b-4 border-[#FDB927] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#FFAE00] text-xl font-bold">NBA HUB</div>
            </div>
          </div>
          <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#552582] to-[#FDB927]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.hero ? "visible" : "hidden"}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: "url('/asset/news-bg.png')",
            filter: "brightness(0.4)"
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 z-1"></div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#FFAE00]">NBA</span> NEWS HUB
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-10">
            The premier destination for exclusive insights, breaking news, and in-depth analysis
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#F2CB05] to-[#F6D806] text-[#440A5E] rounded-full text-lg font-bold hover:from-[#440A5E] hover:to-[#590D7A] hover:text-[#F2CB05] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#590D7A]/30">
            EXPLORE LATEST NEWS
          </button>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
          <div className="animate-bounce w-8 h-14 rounded-full border-4 border-[#FFAE00] flex justify-center">
            <div className="w-2 h-2 bg-[#FFAE00] rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.section 
        ref={statsRef}
        className="py-20 px-4 md:px-8 bg-[url('/asset/stats-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.stats ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#FFAE00]">LEAGUE</span> IN NUMBERS
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 75, label: "YEARS OF HISTORY" },
              { value: 30, label: "TEAMS COMPETING" },
              { value: 1230, label: "REGULAR SEASON GAMES" },
              { value: 450, label: "PLAYERS WORLDWIDE" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-[#FFAE00] mb-2 stat-number" data-target={stat.value}>
                  0
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured News */}
      <motion.section 
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.news ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-[#FFAE00]">FEATURED</span> NEWS
            </h2>
            <button className="text-[#FFAE00] hover:text-[#FFCC28] transition-colors">
              VIEW ALL NEWS →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <div 
                key={index}
                ref={el => newsRef.current[index] = el}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 hover:border-[#FFAE00]/50 transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="bg-[url(/asset/news1.webp)] bg-cover bg-no-repeat w-full h-full "></div>
                  <div className="absolute top-4 right-4 bg-[#FFAE00] text-black px-3 py-1 rounded-full text-sm font-bold">
                    BREAKING
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span>Aug 15, 2025</span>
                    <span className="mx-2">•</span>
                    <span>8 min read</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#FFAE00] transition-colors">
                    Lakers Secure Top Draft Pick in Blockbuster Trade
                  </h3>
                  <p className="text-gray-400 mb-4">
                    The Los Angeles Lakers have made a major move to secure the #1 draft pick...
                  </p>
                  <button className="text-[#FFAE00] flex items-center group-hover:underline">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Player Spotlight */}
      <motion.section 
        className="py-20 px-4 md:px-8"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.players ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#FFAE00]">PLAYER</span> SPOTLIGHT
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2].map((item, index) => (
              <div 
                key={index}
                ref={el => playersRef.current[index] = el}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 p-8 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="relative">
                  <div className="bg-[url(/images/lebronJames1.jpg)] bg-cover bg-center  w-48 h-48 rounded-full"></div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFAE00] text-black px-4 py-1 rounded-full text-sm font-bold">
                    #23
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">LeBron James</h3>
                  <div className="text-[#FFAE00] mb-4">Los Angeles Lakers • Forward</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-gray-500 text-sm">PPG</div>
                      <div className="text-xl font-bold">28.9</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">RPG</div>
                      <div className="text-xl font-bold">8.3</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">APG</div>
                      <div className="text-xl font-bold">6.8</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">FG%</div>
                      <div className="text-xl font-bold">52.3%</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">
                    LeBron continues to defy age with another MVP-caliber season...
                  </p>
                  <button className="text-[#FFAE00] hover:text-[#FFCC28] flex items-center">
                    View Player Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* NEW SECTION 1: Team Standings */}
      <motion.section 
        ref={standingsRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.standings ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#FFAE00]">TEAM</span> STANDINGS
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Western Conference */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#FFAE00]">WESTERN CONFERENCE</h3>
                <span className="text-gray-500 text-sm">W-L</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { team: "Lakers", wins: 58, losses: 24, streak: "W4", logo: "LAL" },
                  { team: "Warriors", wins: 55, losses: 27, streak: "L1", logo: "GSW" },
                  { team: "Suns", wins: 52, losses: 30, streak: "W2", logo: "PHX" },
                  { team: "Clippers", wins: 50, losses: 32, streak: "L2", logo: "LAC" },
                  { team: "Nuggets", wins: 48, losses: 34, streak: "W1", logo: "DEN" }
                ].map((team, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#552582]/20 last:border-0 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm">
                        {team.logo}
                      </div>
                      <span className="font-medium group-hover:text-[#FFAE00] transition-colors">{team.team}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold">{team.wins}-{team.losses}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${team.streak.startsWith('W') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {team.streak}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Eastern Conference */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#FFAE00]">EASTERN CONFERENCE</h3>
                <span className="text-gray-500 text-sm">W-L</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { team: "Celtics", wins: 60, losses: 22, streak: "W3", logo: "BOS" },
                  { team: "Bucks", wins: 56, losses: 26, streak: "L1", logo: "MIL" },
                  { team: "76ers", wins: 54, losses: 28, streak: "W2", logo: "PHI" },
                  { team: "Heat", wins: 51, losses: 31, streak: "W1", logo: "MIA" },
                  { team: "Knicks", wins: 49, losses: 33, streak: "L3", logo: "NYK" }
                ].map((team, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#552582]/20 last:border-0 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold text-sm">
                        {team.logo}
                      </div>
                      <span className="font-medium group-hover:text-[#FFAE00] transition-colors">{team.team}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold">{team.wins}-{team.losses}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${team.streak.startsWith('W') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                        {team.streak}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* NEW SECTION 2: Player Stats Leaders */}
      <motion.section 
        ref={leadersRef}
        className="py-20 px-4 md:px-8"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.leaders ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#FFAE00]">STATS</span> LEADERS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "POINTS PER GAME", 
                color: "#FF335F",
                players: [
                  { name: "Luka Dončić", value: 33.9, team: "DAL" },
                  { name: "Giannis Antetokounmpo", value: 31.5, team: "MIL" },
                  { name: "Joel Embiid", value: 30.2, team: "PHI" },
                  { name: "Shai Gilgeous-Alexander", value: 30.1, team: "OKC" },
                  { name: "Kevin Durant", value: 29.8, team: "PHX" }
                ]
              },
              { 
                title: "ASSISTS PER GAME", 
                color: "#FFCC28",
                players: [
                  { name: "Tyrese Haliburton", value: 10.9, team: "IND" },
                  { name: "Trae Young", value: 10.2, team: "ATL" },
                  { name: "James Harden", value: 9.8, team: "LAC" },
                  { name: "Luka Dončić", value: 9.1, team: "DAL" },
                  { name: "Nikola Jokić", value: 8.9, team: "DEN" }
                ]
              },
              { 
                title: "REBOUNDS PER GAME", 
                color: "#A92551",
                players: [
                  { name: "Domantas Sabonis", value: 13.7, team: "SAC" },
                  { name: "Rudy Gobert", value: 12.9, team: "MIN" },
                  { name: "Nikola Jokić", value: 12.3, team: "DEN" },
                  { name: "Anthony Davis", value: 12.1, team: "LAL" },
                  { name: "Giannis Antetokounmpo", value: 11.8, team: "MIL" }
                ]
              }
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 p-6 group hover:border-[#FFAE00]/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: category.color }}>
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.players.map((player, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-[#552582]/20 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-[#FFAE00]">#{idx + 1}</div>
                        <div>
                          <div className="font-medium">{player.name}</div>
                          <div className="text-gray-500 text-sm">{player.team}</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">{player.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Game Highlights */}
      <motion.section 
        ref={highlightsRef}
        className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]"
        variants={sectionVariants}
        initial="hidden"
        animate={visibleSections.highlights ? "visible" : "hidden"}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-[#FFAE00]">GAME</span> HIGHLIGHTS
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#552582]/30 p-6">
              <div className="relative h-80   rounded-xl mb-6 overflow-hidden">
                <img src="/asset/Lakers vs Celtics.jpg" className='absolute inset-0 w-full h-full object-cover' alt="" />
                <div className="absolute bg-black/40 inset-0 flex items-center justify-center">
                  <div className="bg-[#FFAE00] text-black w-16 h-16 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Lakers vs Celtics: Finals Game 7</h3>
              <p className="text-gray-400 mb-4">
                Relive the intense final moments of the championship-deciding game...
              </p>
              <div className="flex justify-between text-gray-500">
                <span>June 15, 2025</span>
                <span>12:45</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">TOP PLAYS OF THE WEEK</h3>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 mb-6 group">
                  <img src='/asset/kobe-1.jpg' className=" w-24 h-16 rounded-lg flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#FFAE00] transition-colors">
                      Anthony Davis Game-Winning Block
                    </h4>
                    <div className="text-sm text-gray-500 flex items-center">
                      <span>Aug 14, 2025</span>
                      <span className="mx-2">•</span>
                      <span className="text-[#FFAE00]">TOP PLAY</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default NBANewsHub;