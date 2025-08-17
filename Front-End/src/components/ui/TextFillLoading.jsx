import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TextFillLoading = () => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowLogo(true), 500);
    }
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] overflow-auto">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#56065D] opacity-20 filter blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#FFAE00] opacity-15 filter blur-[100px]"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Lakers logo animation */}
        {showLogo ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2
            }}
            className="mb-8"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#56065D] flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-[#FFAE00] rounded-full flex items-center justify-center">
                  <span className="text-[#FFAE00] text-2xl font-bold">L</span>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-[#FFAE00] text-black px-4 py-1 rounded-full text-sm font-bold tracking-widest">
                LEGACY
              </div>
            </div>
          </motion.div>
        ) : null}
        
        {/* Text animation */}
        <div className="relative mb-12">
          <h1 className="text-7xl md:text-8xl font-bold text-[#333] tracking-tighter">LAKERS</h1>
          <motion.div 
            className="absolute top-0 left-0 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-bold tracking-tighter"
              style={{
                background: 'linear-gradient(90deg, #FFCC28, #FFAE00, #FF8C00)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%'] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              LAKERS
            </motion.h1>
          </motion.div>
        </div>
        
        {/* Progress bar */}
        <div className="w-80 max-w-full h-1 bg-[#333] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FFCC28] via-[#FFAE00] to-[#FF8C00]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 1 }}
          />
        </div>
        
        {/* Progress percentage */}
        <motion.div 
          className="mt-4 text-[#FFAE00] font-mono text-lg tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress}%
        </motion.div>
        
        {/* Tagline */}
        {showLogo && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="text-[#FFAE00] text-lg font-light tracking-widest">
              PURPLE & GOLD LEGACY
            </div>
            <div className="text-gray-400 text-sm mt-2">
              ESTABLISHED 1947 • 17-TIME NBA CHAMPIONS
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
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
    </div>
  );
};

export default TextFillLoading;