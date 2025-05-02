import React from 'react'
import { motion } from "framer-motion";

export default function Loading() {
    const fillTextVariants = {
        initial: { width: 0 },
        animate: {
          width: "100%",
          transition: { duration: 2, ease: "easeOut", repeat: Infinity, repeatType: "loop" },
        },
      };  
    
      return (
        <div className="relative w-full rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-700 text-transparent"
            variants={fillTextVariants}
            initial="initial"
            animate="animate"
          />
          <div className="relative text-2xl font-semibold text-gray-800 dark:text-white rounded-full ps-4 items-center flex ">
            Loading...
          </div>
        </div>
      );
}

