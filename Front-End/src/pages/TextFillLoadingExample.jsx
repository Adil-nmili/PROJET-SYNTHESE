import React, { useState, useEffect } from 'react';
import TextFillLoading from '../components/ui/TextFillLoading';

const TextFillLoadingExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900">
      {isLoading ? (
        <TextFillLoading />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-4xl font-bold text-white">Welcome to Lakers!</h1>
        </div>
      )}
    </div>
  );
};

export default TextFillLoadingExample; 