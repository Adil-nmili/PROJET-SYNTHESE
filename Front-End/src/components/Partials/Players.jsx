import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from "lucide-react";
import Players from '../../../service/Players';

const PlayersComponent = () => {
  const [players, setPlayers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  
  // Player data - in a real app this would come from your API
  

  useEffect(() => {
    Players.getPlayers()
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error("Error fetching players:", error);
      });
    
  }, []);

  const nextPlayer = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => 
      prevIndex === players.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPlayer = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? players.length - 1 : prevIndex - 1
    );
  };

  if (players.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-t-4 border-[#552582] border-r-4 border-b-4  rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentPlayer = players[currentIndex];

  return (
    <div className="relative py-10 px-4 md:px-8 lg:px-16  bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFCC28] via-[#A92551] to-[#56065D]"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#FFAE00] opacity-10 filter blur-3xl"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#220540] opacity-50 filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#FFAE00]">LAKERS</span>{" "}
            <span className="text-white">LEGENDARY</span>
          </h2>
          <p className="text-xl text-gray-400 mt-2">MEET THE PLAYERS</p>
        </div>
        
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* Player image with elegant frame */}
          <div className="relative w-full max-w-md">
            <div className="relative overflow-hidden rounded-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#552582] to-[#FDB927] opacity-50 rounded-2xl"></div>
              
              <motion.div
                key={currentPlayer.id}
                initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl"></div>
                <img
                  src={import.meta.env.VITE_BACKEND_URL+'/'+currentPlayer.image}
                  alt={currentPlayer.full_name}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
                
                {/* Jersey number */}
                <div className="absolute top-6 right-6">
                  <div className="text-8xl font-bold text-[#FDB927] opacity-20">
                    {currentPlayer.jersey_number}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Position badge */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#552582] to-[#FDB927] text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest">
              {currentPlayer.position || 'Small Forward'}
            </div>
          </div>
          
          {/* Player info card */}
          <motion.div
            key={currentPlayer.id + "info"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-8 border border-[#552582]/30 shadow-xl"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#FDB927]">
                {currentPlayer.full_name}
              </h2>
              <p className="text-gray-400 italic">{currentPlayer.nickname}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">BIRTH DATE</div>
                <div className="font-medium">{currentPlayer.birth_date}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">BIRTH PLACE</div>
                <div className="font-medium">{currentPlayer.birth_place}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">HEIGHT</div>
                <div className="font-medium">{currentPlayer.height}</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">WEIGHT</div>
                <div className="font-medium">{currentPlayer.weight}KG</div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">JERSEY NUMBER</div>
                <div className="font-medium text-2xl text-[#FDB927]">
                  #{currentPlayer.jersey_number}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-[#FDB927]">NBA TITLES</div>
                <div className="font-medium text-xl text-[#FDB927]">
                  {currentPlayer.championships}
                </div>
              </div>
            </div>
            
            {/* Social media */}
            <div className="mt-10 pt-6 border-t border-[#552582]/30 flex justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.1, color: "#FDB927" }}
                className="text-gray-400"
              >
                <Facebook size={24} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, color: "#FDB927" }}
                className="text-gray-400"
              >
                <Instagram size={24} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, color: "#FDB927" }}
                className="text-gray-400"
              >
                <Youtube size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-center mt-16 gap-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#552582" }}
            className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#552582] flex items-center justify-center text-[#FDB927]"
            onClick={prevPlayer}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <div className="flex items-center gap-2">
            {players.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-[#FDB927]' : 'bg-[#552582]'}`}
                onClick={() => {
                  setDirection(index > currentIndex ? "right" : "left");
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#552582" }}
            className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#552582] flex items-center justify-center text-[#FDB927]"
            onClick={nextPlayer}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PlayersComponent;