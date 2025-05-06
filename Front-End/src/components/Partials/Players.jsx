import React, { useEffect, useState } from 'react'
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Players from '../../../service/Players'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


function PlayersCoposant() {
    const [players, setPlayers] = useState([]);
  useEffect(() => {
    Players.getPlayers()
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => {
        console.error("Error fetching players:", error);
      });
  }, []);
  return (
    <div className="flex justify-center bg-[#552582] py-10">
      <Carousel className="w-full max-w-4xl m-4">
        <CarouselContent>
          {players && players.map((player, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center gap-10">
                {/* Image du joueur */}
                <img
                  src={import.meta.env.VITE_BACKEND_URL +"/"+ player.image}
                  alt={player.full_name}
                  className="w-96 h-100 object-contain"
                />
                {/* {console.log("Image URL:", player.image)} */}

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
  )
}

export default  PlayersCoposant