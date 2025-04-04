import '@fontsource/bebas-neue';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { motion } from 'framer-motion';

// import { useEffect, useState } from 'react';
import PlayersCoposant from '../components/Partials/Players';

function About() {
  const events = [
    { date: "1947", text: "Creation of the Minneapolis Lakers." },
    { date: "1960", text: "Relocation to Los Angeles." },
    { date: "1980s", text: 'The era of Magic Johnson & Kareem Abdul-Jabbar ("Showtime Lakers").' },
    { date: "2000s", text: "Dominance with Kobe Bryant & Shaquille O’Neal." },
    { date: "2020", text: "17th NBA title with LeBron James & Anthony Davis." },
  ];
  
  
  return (
    <div className='bg-[#552582]'>
      <div className="mt-16">
        <img src="vedioImage.png" alt="vedio" className="w-full h-screen object-cover" />
      </div>
      <div className="text-white p-6">
        <h1 className="font-bebas text-5xl text-center uppercase font-bold m-4">
          What is the <span className='bg-gradient-to-r from-[#FDBB30] to-[#A57468] bg-clip-text text-transparent'>Los Angeles Lakers</span>
        </h1>
        <h3 className='text-[#AD8291] font-bold font-bebas text-base  mb-4'>
          The Los Angeles Lakers: A Legacy of Excellence
        </h3>
        <p className='font-roboto text-base tracking-wider  px-6 mb-12  text-justify'>
          Founded in 1947, the Los Angeles Lakers are more than just a basketball team—they are a cultural phenomenon. With 17 NBA championships and a legacy of legendary players like Magic Johnson, Kobe Bryant, Kareem Abdul-Jabbar, and LeBron James, the Lakers represent the pinnacle of basketball greatness. Known for their iconic purple and gold colors, their "Showtime" style of play, and their deep connection to the city of Los Angeles, the Lakers have captivated fans around the world for decades. Whether it’s the electric atmosphere of the Crypto.com Arena or the unforgettable moments that define their history, the Lakers embody passion, innovation, and excellence both on and off the court.
        </p>
         {/* Timeline */}
         <div className="relative w-full ">
          <div className="max-w-6xl mx-auto px-4">
            {/* Ligne verticale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-white"></div>

            {events.map((event, index) => (
              <motion.div
                key={index}
                className={`mb-16 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
                initial={{ opacity: 0, y: 50 }} // Initial state: opaque and slightly down
                whileInView={{ opacity: 1, y: 0 }}  // Final state: fully visible and in place
                viewport={{ once: true, amount: 0.5 }}  // Trigger animation when element is 50% in view
                transition={{ duration: 0.8, delay: index * 0.2 }}  // Delay per item
              >
                {/* Bloc gauche avec la date */}
                <div className="w-5/12 flex flex-col  items-center">
                  {/* Bloc contenant la date et le texte */}
                  <motion.div
                    className="w-full bg-[#816D98] p-6 rounded-lg shadow-lg mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-base mb-2 text-center text-left font-bebas text-white">{event.date}</div>
                    <p className="font-bebas text-white text-center tracking-wide">{event.text}</p>
                  </motion.div>
                </div>

                {/* Rond central */}
                <div className="z-10 w-6 h-6 bg-white rounded-full border-4 border-[#FDBB30]"></div>

                {/* Bloc droit (peut être supprimé ou modifié selon le design) */}
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <img src="basketball2.png"  className='float-left' />
        <img src="basketball.png" className='float-right' />
      </div>
      <div>
        <img src="image.webp" alt="Lakers Teams" />
      </div>
      <div className='h-screen'>
                <h1 className="font-bebas text-5xl text-center text-white uppercase font-bold m-4">
                    Players
                  </h1>
               
                < PlayersCoposant/>
  

                
      </div>
        <div className='flex justify-center items-center'>
    <img src="background.png" alt="" />
  </div>
    </div>
  );
}

export default About;

