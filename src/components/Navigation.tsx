import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, X, Menu, Bell } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPremiumMenuOpen, setIsPremiumMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePremiumMenuToggle = () => {
    setIsPremiumMenuOpen(!isPremiumMenuOpen);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo - Navigates to Home */}
            <div className="flex items-center">
              <Logo onClick={() => navigate('/')} />
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('Home')}
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('Blog')}
              </Link>
              
              {/* Premium Plans Dropdown */}
              <div className="relative">
                <button 
                  onClick={handlePremiumMenuToggle}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('Premium Plans')}
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPremiumMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPremiumMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link 
                      to="/premium/document-services"
                      onClick={() => setIsPremiumMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {t('Document Services')}
                    </Link>
                    <Link 
                      to="/premium/legal-protection"
                      onClick={() => setIsPremiumMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {t('Legal Protection Plans')}
                    </Link>
                    <Link 
                      to="/insurance"
                      onClick={() => setIsPremiumMenuOpen(false)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {t('Insurance')}
                    </Link>
                  </div>
                )}
              </div>

              {/* About Page Button */}
              <Link 
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {t('About')}
              </Link>

              {/* Language Selector */}
              <LanguageSelector />
              
              {isSignedIn && (
                <Link
                  to="/notifications"
                  className="relative text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    3
                  </span>
                </Link>
              )}
              
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Hi, {user?.firstName}</span>
                  <UserButton />
                </div>
              ) : (
                <>
                  <SignUpButton mode="modal">
                    <button className="text-gray-600 hover:text-blue-600 transition-colors">
                      {t('Sign Up')}
                    </button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      {t('Login')}
                    </button>
                  </SignInButton>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 w-full bg-white shadow-md z-40">
          <div className="px-4 py-2 space-y-4">
            <Link 
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gray-600 hover:text-blue-600"
            >
              {t('Home')}
            </Link>
            <Link 
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gray-600 hover:text-blue-600"
            >
              {t('Blog')}
            </Link>
            
            {/* Mobile Premium Plans Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsPremiumMenuOpen(!isPremiumMenuOpen)}
                className="flex items-center w-full text-left text-gray-600 hover:text-blue-600"
              >
                {t('Premium Plans')}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPremiumMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPremiumMenuOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link 
                    to="/premium/document-services"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPremiumMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('Document Services')}
                  </Link>
                  <Link 
                    to="/premium/legal-protection"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPremiumMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('Legal Protection Plans')}
                  </Link>
                  <Link 
                    to="/insurance"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsPremiumMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('Insurance')}
                  </Link>
                </div>
              )}
            </div>

            {/* About Page Button */}
            <Link 
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left text-gray-600 hover:text-blue-600"
            >
              {t('About')}
            </Link>

            {/* Language Selector */}
            <LanguageSelector isMobile={true} />
            
            {isSignedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Hi, {user?.firstName}</span>
                <UserButton />
              </div>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="block w-full text-left text-gray-600 hover:text-blue-600">
                    {t('Sign Up')}
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {t('Login')}
                  </button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;