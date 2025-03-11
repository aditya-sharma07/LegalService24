import React from 'react';
import { Handshake } from 'lucide-react'; // Import a handshake icon

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
      aria-label="Go to Home"
    >
      {/* Handshake Icon */}
      <div className="p-2 rounded-full bg-blue-600 shadow-md transition-transform duration-300 hover:scale-110"> {/* Simplified background */}
        <Handshake className="h-8 w-8 text-white" />
      </div>

      {/* Improved Text Styling */}
      <span className="text-2xl font-bold text-blue-800 transition-colors duration-300"> {/* Solid color, cleaner look */}
        LegalConnect
      </span>
    </button>
  );
};

export default Logo;