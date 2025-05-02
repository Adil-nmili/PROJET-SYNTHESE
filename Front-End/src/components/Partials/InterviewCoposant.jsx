import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const interviews = [
  {
    title: "Los Angeles Lakers vs Minnesota Timberwolves ",
    description: "- Full Game 3 Highlights | April 25, 2025 | 2025 NBA Playoffs",
    image: "/lakers-champions.png",
    url: "https://www.youtube.com/watch?v=MU8efpzQ09U"
  },
  {
    title: "Luka Doncic Talks Elimination",
    description: "Luka Doncic Talks Elimination, Playing w/ LeBron, & His Lakers Future | 2025 NBA Playoffs.",
    image: "/24.jpg",
    url: "https://www.youtube.com/watch?v=Lr4FolakKNo"
  },
  {
    title: "Anthony Edwards, Julius Randle & Naz Reid ",
    description: "Anthony Edwards, Julius Randle & Naz Reid on eliminating the Los Angeles Lakers | NBA on ESPN",
    image: "/lakersTeams.jpg",
    url: "https://www.youtube.com/watch?v=ZtT_VgatndM"
  }
];
function InterviewCoposant() {
    return (
      <div
      
        className=" py-10 px-4"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white/80 p-6 rounded-xl">
          <div className="flex flex-wrap justify-center gap-6">
            {interviews.map((item, index) => (
                <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
              <Card
                key={index}
                className="w-80 bg-white shadow-md transition-transform hover:scale-105 hover:shadow-lg rounded-md overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-5 flex flex-col justify-between h-64">
                  <div>
                    <h3 className="text-xl font-semibold text-[#552582]">{item.title}</h3>
                    <p className="text-gray-700 text-sm mt-2">{item.description}</p>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 bg-[#552582] text-white text-center px-4 py-2 rounded hover:bg-[#3e1f6f] transition-colors"
                  >
                    More
                  </a>
                </CardContent>
              </Card>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  export default InterviewCoposant;