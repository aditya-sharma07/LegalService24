import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LawCategoriesSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const lawCategories = [
    {
      type: "Civil Law",
      icon: "⚖️",
      color: "from-blue-400 to-blue-600",
      subcategories: [
        "Family & Matrimony Advice",
        "Banking & Corporate Matters",
        "Employment & Labor Matters",
        "Property Disputes",
        "Send a Demand Notice",
        "Draft Agreement",
        "Review Property Papers",
        "Partition Suit",
        "Consumer Disputes",
        "Intellectual Property Rights"
      ]
    },
    {
      type: "Criminal Law",
      icon: "🛡️",
      color: "from-red-400 to-red-600",
      subcategories: [
        "Cheque Bounce Cases",
        "Domestic Violence",
        "Sexual Harassment at Workplace",
        "Fraud & Cybercrime",
        "Theft & Robbery",
        "Assault & Battery",
        "Drug Offenses",
        "White-Collar Crimes",
        "Criminal Defense",
        "Bail Applications"
      ]
    }
  ];

  const handleSubcategoryClick = (subcategory: string, specialization: string) => {
    navigate('/lawyer-selection', { 
      state: { 
        specialization: specialization, 
        subcategory: subcategory 
      } 
    });
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Professional Expertise')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('Legal Expertise Areas')}
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            {t('Choose from our wide range of legal categories to find the right solution for your needs.')}
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg p-1 bg-gray-100">
            {lawCategories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === index 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <span className="mr-2">{category.icon}</span>
                {t(category.type)}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {lawCategories[activeCategory].subcategories.map((subcategory, index) => (
              <button
                key={index}
                onClick={() => handleSubcategoryClick(subcategory, lawCategories[activeCategory].type)}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-blue-50 transition-colors group text-left"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${lawCategories[activeCategory].color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                    {t(subcategory)}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawCategoriesSection;