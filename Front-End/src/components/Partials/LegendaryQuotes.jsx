import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LegendaryQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const playerQuotes = [
    {
      id: 1,
      author: "Kobe Bryant",
      quote: "Everything negative - pressure, challenges - is all an opportunity for me to rise.",
      image: "/quotes/4.png",
      title: "5× NBA Champion"
    },
    {
      id: 2,
      author: "Magic Johnson",
      quote: "All things are possible if you believe. The Lakers are proof of that.",
      image: "/quotes/3.png",
      title: "5× NBA Champion"
    },
    {
      id: 3,
      author: "LeBron James",
      quote: "I like the responsibility of having the last shot. I built my career on that.",
      image: "/quotes/2.png",
      title: "4× NBA Champion"
    },
    {
      id: 4,
      author: "Shaquille O'Neal",
      quote: "Excellence is not a singular act, but a habit. You are what you repeatedly do.",
      image: "/quotes/5.png",
      title: "4× NBA Champion"
    },
    {
      id: 5,
      author: "Kareem Abdul-Jabbar",
      quote: "Your mind is what makes everything else work. That's where the battle is won.",
      image: "/quotes/1.png",
      title: "6× NBA Champion"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % playerQuotes.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-10 px-4 overflow-hidden bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#FFAE00] opacity-5 filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#56065D] opacity-5 filter blur-3xl"></div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            backgroundColor: i % 3 === 0 ? '#FFAE00' : '#56065D',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20],
            x: [0, Math.random() * 40 - 20],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-4xl md:text-5xl text-center mb-10"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFCC28] via-[#FFAE00] to-[#FF8C00]">
            LEGENDARY
          </span>
          <span className="block mt-2 text-white">LAKERS WISDOM</span>
        </motion.h1>
        
        <div className="relative h-[400px] overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={playerQuotes[currentQuote].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-full max-w-3xl">
                {/* Quote card */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-[#552582]/30 shadow-2xl backdrop-blur-xl"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 174, 0, 0.15), inset 0 0 20px rgba(255, 204, 40, 0.1)'
                  }}
                >
                  {/* Player image with decorative elements */}
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-0 rounded-full border-4 border-[#FFAE00] border-dashed opacity-30"
                      />
                      <motion.div
                        animate={{
                          rotate: [360, 0],
                        }}
                        transition={{
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute inset-4 rounded-full border-4 border-[#56065D] border-dashed opacity-30"
                      />
                      <motion.img
                        src={playerQuotes[currentQuote].image}
                        alt={playerQuotes[currentQuote].author}
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#FFCC28] shadow-[0_0_25px_rgba(255,204,40,0.5)] relative z-10"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  
                  {/* Quote content */}
                  <div className="pt-16 text-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p className="text-2xl md:text-3xl text-white/90 italic leading-relaxed mb-8 font-light">
                        "{playerQuotes[currentQuote].quote}"
                      </p>
                      <div className="border-t border-[#552582]/30 pt-6">
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-2xl font-bold text-[#FFCC28]"
                        >
                          {playerQuotes[currentQuote].author}
                        </motion.p>
                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-[#A92551] text-sm uppercase tracking-widest mt-2"
                        >
                          {playerQuotes[currentQuote].title}
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Decorative corner elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#FFAE00]"></div>
                <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-[#FFAE00]"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-[#FFAE00]"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#FFAE00]"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-12 gap-3">
          {playerQuotes.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${currentQuote === index ? 'bg-[#FFCC28]' : 'bg-[#552582]'}`}
              onClick={() => setCurrentQuote(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegendaryQuotes;