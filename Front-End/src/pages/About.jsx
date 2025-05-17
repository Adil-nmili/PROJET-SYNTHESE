// import '@fontsource/bebas-neue';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/700.css';
import { motion, AnimatePresence } from 'framer-motion';

// import { useEffect, useState } from 'react';
import PlayersCoposant from '../components/Partials/Players';
import { useEffect, useState } from 'react';
import SplashScreen from '../components/Partials/SplashScreen';
import InterviewCoposant from '../components/Partials/InterviewCoposant';

function About() {
  const events = [
    { date: "1947", text: "Creation of the Minneapolis Lakers." },
    { date: "1960", text: "Relocation to Los Angeles." },
    { date: "1980s", text: 'The era of Magic Johnson & Kareem Abdul-Jabbar ("Showtime Lakers").' },
    { date: "2000s", text: "Dominance with Kobe Bryant & Shaquille O'Neal." },
    { date: "2020", text: "17th NBA title with LeBron James & Anthony Davis." },
  ];

  const playerQuotes = [
    {
      quote: "I'll do whatever it takes to win games, whether it's sitting on a bench waving a towel, handing a cup of water to a teammate, or hitting the game-winning shot.",
      author: "Kobe Bryant",
      image: "/players/bryant.jpg"
    },
    {
      quote: "The most important thing is to try and inspire people so that they can be great in whatever they want to do.",
      author: "LeBron James",
      image: "/players/CaricatureLebron.jpg"
    },
   
    {
      quote: "The best revenge is massive success.",
      author: "Magic Johnson",
      image: "/players/Magic.jpg"
    },
    {
      quote: "I'm going to use all my tools, my God-given ability, and make the best life I can with it.",
      author: "Shaquille O'Neal",
      image: "/players/neal.jpg"
    }
  ];

  const [loading, setLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    // SplashScreen dure 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 9000
  );

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % playerQuotes.length);
    }, 4000);

    return () => clearInterval(quoteTimer);
  }, []);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }
  
  
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-[#FDBB30]/10'>
      {/* Hero Section */}
      <div className="text-[#552582] px-4 py-12 md:px-16 md:py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-4xl text-center uppercase font-bold m-2"
        >
          What is the <span className='bg-gradient-to-r from-[#FDBB30] to-[#A57468] bg-clip-text text-transparent'>Los Angeles Lakers</span>
        </motion.h1>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-[#AD8291] font-bold font-bebas text-sm mb-2'
        >
          The Los Angeles Lakers: A Legacy of Excellence
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-[#552582] text-sm tracking-wider px-4 mb-8 text-justify'
        >
          Founded in 1947, the Los Angeles Lakers are more than just a basketball team—they are a cultural phenomenon. With 17 NBA championships and a legacy of legendary players like Magic Johnson, Kobe Bryant, Kareem Abdul-Jabbar, and LeBron James, the Lakers represent the pinnacle of basketball greatness. Known for their iconic purple and gold colors, their "Showtime" style of play, and their deep connection to the city of Los Angeles, the Lakers have captivated fans around the world for decades. Whether it's the electric atmosphere of the Crypto.com Arena or the unforgettable moments that define their history, the Lakers embody passion, innovation, and excellence both on and off the court.
        </motion.p>

        {/* Timeline Section */}
        <div className="relative w-full py-8">
  <div className="max-w-5xl mx-auto">
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-[#AD8291]"></div>

    {events.map((event, index) => (
      <motion.div
        key={index}
        className={`mb-6 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        {/* Zone de la carte réduite */}
        <div className="w-1/3 flex flex-col items-center">
          <motion.div
            className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-xl transform hover:scale-[1.02] transition-all duration-300 border-2 border-[#AD8291]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-[#552582] text-base font-bebas mb-2">
                {event.date}
              </p>
              <p className="text-[#552582] text-sm font-bebas leading-relaxed">
                {event.text}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Point central de la timeline */}
        <div className="z-10 w-4 h-4 bg-white rounded-full border-4 border-[#AD8291] shadow-lg"></div>

        {/* Zone vide en face */}
        <div className="w-1/3"></div>
      </motion.div>
    ))}
  </div>
</div>
</div>


      {/* Players Section */}
      <div className="relative w-full py-20">
        <img
          src="basketball2.png"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-28 h-28 object-contain"
          alt="Basketball Left"
        />

        <img
          src="basketball2.png"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-28 h-28 object-contain"
          alt="Basketball Right"
        />

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-bebas text-5xl text-[#552582] uppercase font-bold ">
            Players
          </h1>
          <PlayersCoposant />
        </div>
      </div>
       {/* Section Quotes Slider */}
      <div className="py-2 px-5 ">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bebas text-3xl text-center text-[#552582] uppercase font-bold mb-8"
        >
          Legendary Quotes
        </motion.h1>
        <div className="max-w-3xl mx-auto relative h-[300px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl transform hover:scale-95  transition-all duration-300 border-2 border-[#AD8291]">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-center mb-6"
                >
                  <div className="relative">
                    <motion.img
                      src={playerQuotes[currentQuote].image}
                      alt={playerQuotes[currentQuote].author}
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#AD8291] shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-[#AD8291]"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-[#552582] text-lg italic mb-4 font-bebas leading-relaxed">
                    "{playerQuotes[currentQuote].quote}"
                  </p>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-[#AD8291] font-bold text-base font-bebas"
                  >
                    - {playerQuotes[currentQuote].author}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className='py-5'>
        <h1 className="font-bebas text-5xl text-center text-[#552582] uppercase font-bold m-4">
          interview
        </h1>
        <InterviewCoposant/> 
      </div>

     
    </div>
  );
}

export default About;

