import React from 'react';
import { Users, Award, BookOpen, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Clients Served" },
    { icon: <Award className="w-6 h-6" />, value: "98%", label: "Success Rate" },
    { icon: <BookOpen className="w-6 h-6" />, value: "20+", label: "Years Experience" },
    { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Support" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center text-white p-4 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-3 bg-white bg-opacity-10 p-3 rounded-full w-16 h-16 mx-auto">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-blue-100">{t(stat.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;