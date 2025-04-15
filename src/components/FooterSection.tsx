import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Phone, MapPin, ChevronRight, ExternalLink, Heart
} from 'lucide-react';
// Fix deprecated social icons by updating imports
import { 
  Linkedin as LinkedinIcon, 
  Twitter as X, 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fix unused parameter by actually using it in function body
  const handleServiceClick = (service: string): void => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const serviceElement = document.getElementById(service.toLowerCase().replace(' ', '-'));
      if (serviceElement) {
        serviceElement.scrollIntoView({ behavior: "smooth" });
      } else {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const socialLinks = [
    { name: "LinkedIn", icon: <LinkedinIcon className="w-5 h-5" />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <X className="w-5 h-5" />, url: "https://twitter.com" },
    { name: "Facebook", icon: <FacebookIcon className="w-5 h-5" />, url: "https://facebook.com" },
    { name: "Instagram", icon: <InstagramIcon className="w-5 h-5" />, url: "https://instagram.com" }
  ];

  const services = [
    { name: "Online Consultation", action: () => handleServiceClick("Online Consultation") },
    { name: "Home Appointment", action: () => handleServiceClick("Home Appointment") },
    { name: "Office Appointment", action: () => handleServiceClick("Office Appointment") }
  ];

  return (
    <footer>
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

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">{t('Company')}</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/become-consultant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {t('Become a Consultant')}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/careers')}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {t('Careers')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {t('Terms & Conditions')}
                  </button>
                </li>
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

          {/* Copyright - Fix alignment issues */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} LegalService24. {t('All rights reserved.')}
              </p>
              <div className="mb-4 md:mb-0 flex items-center text-gray-400">
                <span>{t('Made with')}</span>
                <Heart className="w-4 h-4 mx-1 text-red-500" />
                <span>{t('for our clients')}</span>
              </div>
              <div className="flex space-x-4">
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
      </div>
    </footer>
  );
};

export default Footer;