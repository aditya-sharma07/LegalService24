import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from '@components/HeroSection';
import StatsSection from '@components/StatsSection'; 
import FeaturesSection from '@components/FeaturesSection';
import LawCategoriesSection from '@components/LawCategoriesSection';
import ServicesSection from '@components/ServicesSection';
import TestimonialsSection from '@components/TestimonialsSection';
import FAQSection from '@components/FAQSection'; 
import FooterSection from '@components/FooterSection';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <LawCategoriesSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </>
  );
};

export default Home;