import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ExternalLink, Mail, Phone, MapPin, Twitter, Facebook, 
  Linkedin, Instagram, ChevronRight, Heart 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleServiceClick = (service: string): void => {
    // Scroll to the "Book Appointments" section
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, url: "https://twitter.com" },
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, url: "https://facebook.com" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "https://instagram.com" }
  ];

  const quickLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/explore-services" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Terms & Conditions", path: "/terms" }
  ];

  const services = [
    { name: "Online Consultation", action: () => handleServiceClick("Online Consultation") },
    { name: "Home Appointment", action: () => handleServiceClick("Home Appointment") },
    { name: "Office Appointment", action: () => handleServiceClick("Office Appointment") },
    { name: "Document Review", action: () => navigate("/document-review") },
    { name: "Legal Advice", action: () => navigate("/legal-advice") }
  ];

  return (
    <footer>
      {/* Pre-Footer */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-blue-700 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                {t('Ready to get started?')}
              </h3>
              <p className="text-blue-100">
                {t('Connect with our legal experts today for a consultation.')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/schedule-consultation')}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                {t('Schedule a Consultation')}
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                {t('Contact Us')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">LegalService24</h3>
              <p className="text-gray-400 mb-6">
                {t('Your trusted legal partner, available 24/7 for all your legal needs.')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">contact@legalservice24.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">123 Legal Street, NY</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('Quick Links')}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => navigate(link.path)}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {t(link.name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('Services')}</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={service.action}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {t(service.name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('Newsletter')}</h4>
              <p className="text-gray-400 mb-4">
                {t('Subscribe to our newsletter for the latest legal updates.')}
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder={t('Your email')}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  {t('Join')}
                </button>
              </form>
              
              <div className="mt-6">
                <h5 className="font-medium mb-3">{t('Follow Us')}</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} LegalService24. {t('All rights reserved.')}
            </p>
            <div className="mt-4 md:mt-0 flex justify-center items-center text-gray-400">
              <span>{t('Made with')}</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>{t('for our clients')}</span>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4 justify-center">
              <button 
                onClick={() => navigate('/privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('Privacy Policy')}
              </button>
              <button 
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t('Terms of Service')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;