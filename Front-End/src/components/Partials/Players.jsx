
import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Players from '../../../service/Players';
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
    <div className="py-10">
      <Carousel className="w-full max-w-6xl mx-auto rounded-xl shadow-md shadow-black/50">
        <CarouselContent>
          {players.map((player, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[500px] rounded-xl overflow-hidden group">

                {/* ✅ Image floutée en arrière-plan */}
                <img
                  src={import.meta.env.VITE_BACKEND_URL + "/" + player.image}
                  alt={player.full_name}
                  className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 z-0"
                />

                {/* ✅ Cartes par-dessus */}
                <div className="relative z-10 flex items-center justify-between h-full px-10">

                  {/* 🟣 Carte Info */}
                  <Card className="w-[45%] bg-white/90 backdrop-blur-lg shadow-xl rounded-lg p-6">
                    <CardContent className="space-y-4 text-gray-800">
                      <h2 className="text-2xl font-bold text-center text-[#552582]">
                        {player.full_name.toUpperCase()}
                      </h2>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <strong>Nom complet</strong><br />{player.full_name}
                        </div>
                        <div>
                          <strong>Date de naissance</strong><br />{player.birth_date}
                        </div>
                        <div>
                          <strong>Lieu de naissance</strong><br />{player.birth_place}
                        </div>
                        <div>
                          <strong>Surnoms</strong><br />{player.nickname}
                        </div>
                        <div>
                          <strong>Taille</strong><br />{player.height}
                        </div>
                        <div>
                          <strong>Poids</strong><br />{player.weight}
                        </div>
                      </div>
                      <div className="text-sm">
                        <strong>Titres NBA</strong><br />{player.championships}
                      </div>
                      <div className="flex justify-center gap-4 mt-2 text-gray-700">
                        <Facebook className="hover:text-yellow-500 cursor-pointer" />
                        <Instagram className="hover:text-yellow-500 cursor-pointer" />
                        <Youtube className="hover:text-yellow-500 cursor-pointer" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* 🟣 Carte Image avec effet hover */}
                  <div className=" h-[320px] overflow-hidden rounded-lg shadow-xl transition-transform duration-500 ease-in-out transform group-hover:scale-105">
                    <img
                      src={import.meta.env.VITE_BACKEND_URL + "/" + player.image}
                      alt={player.full_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black" />
        <CarouselNext className="text-black" />
      </Carousel>
    </div>
  );
}

export default PlayersCoposant;
