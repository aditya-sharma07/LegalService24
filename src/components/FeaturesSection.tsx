import React from 'react';
import { FileCheck, Bell, FileText, Languages, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <FileCheck className="w-12 h-12" />,
      title: "Document Upload",
      description: "Securely upload and share legal documents with your lawyer",
      action: () => navigate('/document-upload'),
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: "Legal Alerts",
      description: "Stay updated with case progress and important legal changes",
      action: () => navigate('/notifications'),
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Case Tracking",
      description: "Monitor the status of your legal matters in real-time",
      action: () => navigate('/case-tracking'),
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Languages className="w-12 h-12" />,
      title: "Multi-Language Support",
      description: "Access legal services in your preferred language",
      action: () => null,
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Innovative Platform')}</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">{t('Smart Legal Solutions')}</h2>
          <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            {t('Innovative features designed to make your legal experience seamless and efficient.')}
          </p>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              onClick={feature.action}
            >
              <div className={`${feature.color} p-4 rounded-full inline-flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(feature.title)}</h3>
              <p className="text-gray-600 mb-4 text-sm">{t(feature.description)}</p>
              {feature.title !== "Multi-Language Support" && (
                <button
                  className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors flex items-center gap-2"
                >
                  {t('Learn More')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;