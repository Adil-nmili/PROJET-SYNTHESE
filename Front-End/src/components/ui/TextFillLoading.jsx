import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TextFillLoading = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex bg-black w-full items-center justify-center h-screen">
      <div className="relative">
        <h1 className="text-8xl font-bold text-gray-200">LAKERS</h1>
        <motion.h1 
          className="absolute top-0 left-0 text-8xl font-bold text-orange-500 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        >
          LAKERS
        </motion.h1>
      </div>
    </div>
  );
};

export default TextFillLoading; 