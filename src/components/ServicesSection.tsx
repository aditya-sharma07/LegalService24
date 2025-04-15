import React from 'react';
import { Calendar, FileText, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ServicesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const services = [
    {
      title: "Online Consultation",
      description: "Connect with expert lawyers from the comfort of your home",
      icon: <Calendar className="w-8 h-8" />,
      lawyer: "Sarah Johnson",
      price: "$99/hour",
      bgColor: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      action: "Book Now"
    },
    {
      title: "Home Appointment",
      description: "Our experts will visit you at your home for consultation.",
      icon: <FileText className="w-8 h-8" />,
      lawyer: "Michael Chen",
      price: "$199/Appointment",
      bgColor: "from-green-50 to-green-100",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      action: "Schedule a Visit"
    },
    {
      title: "Office Appointment",
      description: "Meet our legal professionals at our office.",
      icon: <Shield className="w-8 h-8" />,
      lawyer: "David Smith",
      price: "$299/Appointment",
      bgColor: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      action: "Visit Office"
    }
  ];

  const handleBookAppointment = (): void => {
    navigate('/lawyer-selection'); // ✅ No filters applied
  };

  return (
    <div id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Professional Services')}</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">{t('Book Appointment Now')}</h2>
          <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            {t('Comprehensive legal solutions designed to protect your interests and provide expert guidance when you need it most.')}
          </p>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br ${service.bgColor} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
            >
              <div className={`${service.iconBg} ${service.iconColor} p-3 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(service.title)}</h3>
              <p className="text-gray-600 mb-4">{t(service.description)}</p>
              
              <div className="flex justify-between items-center mb-6 border-t border-b py-3 border-gray-200 border-opacity-50 my-4">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">{t('Expert')}</span>
                  <span className="font-medium">{service.lawyer}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">{t('Starting from')}</span>
                  <span className="font-bold text-blue-600">{service.price}</span>
                </div>
              </div>
              
              <button
                onClick={handleBookAppointment}
                className="w-full bg-white text-blue-600 border border-blue-200 py-3 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
              >
                {t(service.action)}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
