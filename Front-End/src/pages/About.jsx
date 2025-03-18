import '@fontsource/bebas-neue';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function About() {
  const events = [
    { date: "1947", text: "Creation of the Minneapolis Lakers." },
    { date: "1960", text: "Relocation to Los Angeles." },
    { date: "1980s", text: 'The era of Magic Johnson & Kareem Abdul-Jabbar ("Showtime Lakers").' },
    { date: "2000s", text: "Dominance with Kobe Bryant & Shaquille O’Neal." },
    { date: "2020", text: "17th NBA title with LeBron James & Anthony Davis." },
  ];
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/players") // Vérifie l'URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Players data:", data); // Vérifie les données dans la console
        setPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []);
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
               
     <div className="flex justify-center bg-[#552582] py-10">
      <Carousel className="w-full max-w-4xl m-4">
        <CarouselContent>
          {players.map((player, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center gap-10">
                {/* Image du joueur */}
                <img
                  src={`players/${player.image}`}
                  alt={player.full_name}
                  className="w-96 h-100 object-contain"
                />
                
                {/* Carte d'informations */}
                <Card className="bg-[#816D98] text-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-center text-3xl font-bold text-[#FDBB30] mb-4">
                    {player.full_name.toUpperCase()}
                  </h2>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Nom complet</strong> <br /> {player.full_name}
                      </div>
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Date de naissance</strong> <br /> {player.birth_date}
                      </div>
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Lieu de naissance</strong> <br /> {player.birth_place}
                      </div>
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Surnoms</strong> <br /> {player.nickname}
                      </div>
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Taille</strong> <br /> {player.height}
                      </div>
                      <div className="bg-white text-gray-800 p-2 rounded-md text-sm">
                        <strong>Poids</strong> <br /> {player.weight}
                      </div>
                    </div>
                    <div className="bg-white text-gray-800 p-3 rounded-md text-sm">
                      <strong>Titres NBA</strong> <br /> {player.championships}
                    </div>
                  </CardContent>
                  {/* Réseaux sociaux */}
                  <div className="flex justify-center gap-4 mt-4 text-2xl">
                    <Facebook className="cursor-pointer text-white hover:text-gray-400" />
                    <Instagram className="cursor-pointer text-white hover:text-gray-400" />
                    <Youtube className="cursor-pointer text-white hover:text-gray-400" />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-yellow-400" />
        <CarouselNext className="text-yellow-400" />
      </Carousel>
    </div>
  

                
      </div>
        <div className='flex justify-center items-center'>
    <img src="background.png" alt="" />
  </div>
    </div>
  );
}

export default About;

