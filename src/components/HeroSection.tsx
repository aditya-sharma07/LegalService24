import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const taglines = [
    'Your Legal Consultation, Your Schedule!',
    'Talk to Our Legal Experts – Anytime, Anywhere.',
    'Seamless Legal Consultations in Just a Few Clicks.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative bg-black text-white pt-16 h-[90vh] md:h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl px-4 text-center">
        <div className="mb-6 inline-block bg-blue-600/20 px-4 py-1 rounded-full text-sm font-medium tracking-wide text-blue-100 backdrop-blur-sm">
          24/7 Legal Assistance
        </div>

        <AnimatePresence mode="wait">
          <motion.h1
            key={taglines[currentTagline]}
            className="text-4xl md:text-6xl font-extrabold mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            {t(taglines[currentTagline])}
          </motion.h1>
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/explore-services')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200"
          >
            {t('Explore Services')} <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/lawyer-selection')}
            className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
          >
            {t('Find a Lawyer')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
