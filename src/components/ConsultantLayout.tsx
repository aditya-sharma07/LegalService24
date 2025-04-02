import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from './Logo';

interface ConsultantLayoutProps {
  children: React.ReactNode;
}

const ConsultantLayout: React.FC<ConsultantLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header with just logo and back button */}
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo onClick={() => navigate('/')} />
          </div>
          <Link 
            to="/" 
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Main Site
          </Link>
        </div>
      </header>
      
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default ConsultantLayout;