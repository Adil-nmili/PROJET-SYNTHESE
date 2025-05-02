import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [showText, setShowText] = useState(true);
  const [animateSplit, setAnimateSplit] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setAnimateSplit(true);
    }, 4000);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 7000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">

      {/* Image de fond en plein écran */}
      <img
        src="walpaper.jpg"
        alt="Splash background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Titre "LAKERS" divisé */}
      {showText && (
        <div className="flex z-40 text-white text-6xl font-bebas tracking-[18px] uppercase">
          <motion.div
            style={{ WebkitTextStroke: "3px white", color: "transparent" }}
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: 1.6, x: animateSplit ? "-150vw" : 0 }}
            transition={{ duration: animateSplit ? 2 : 2.5, ease: "easeInOut" }}
            className="mr-24"
          >
            LA
          </motion.div>
          <motion.div
            style={{ WebkitTextStroke: "3px white", color: "transparent" }}
            initial={{ scale: 1, x: 0 }}
            animate={{ scale: 1.6, x: animateSplit ? "150vw" : 0 }}
            transition={{ duration: animateSplit ? 2 : 2.5, ease: "easeInOut" }}
          >
            KERS
          </motion.div>
        </div>
      )}

      {/* Volets gauche et droite */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-[#552582] w-1/2 z-30"
        initial={{ x: 0 }}
        animate={{ x: animateSplit ? "-100%" : 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.div
        className="absolute right-0 top-0 bottom-0 bg-[#552582] w-1/2 z-30"
        initial={{ x: 0 }}
        animate={{ x: animateSplit ? "100%" : 0 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
    </div>
  );
}
