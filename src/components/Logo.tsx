import React from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react"; // ✅ Scales of Justice

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center space-x-3 transition-all duration-300 focus:outline-none focus:ring-0 active:outline-none" // ✅ Removes border beam
      aria-label="Go to Home"
      whileHover={{ scale: 1.1 }} // ✅ Smooth zoom effect
      whileTap={{ scale: 0.95 }} // ✅ Shrink effect on click
    >
      {/* ✅ Animated Scales of Justice + 24/7 Symbol */}
      <motion.div
        className="relative p-3 rounded-full bg-blue-600 flex items-center justify-center"
        animate={{ rotate: [0, -5, 5, 0] }} // ✅ Tilting effect
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Scale className="h-8 w-8 text-white" />
        {/* ✅ Pulsating 24/7 Symbol */}
        <motion.div
          className="absolute bottom-0 right-0 bg-white text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          24/7
        </motion.div>
      </motion.div>

      {/* ✅ Color Transition on Text */}
      <motion.span
        className="text-2xl font-bold text-blue-800"
        animate={{ color: ["#1E3A8A", "#3B82F6", "#1E3A8A"] }} // ✅ Smooth color animation
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      >
        LegalService24
      </motion.span>
    </motion.button>
  );
};

export default Logo;
