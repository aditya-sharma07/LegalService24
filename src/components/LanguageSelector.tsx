import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  isMobile?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>("English");

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "bn", name: "বাংলা" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "ml", name: "മലയാളം" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
  ];

  useEffect(() => {
    // Update the selected language in UI when changed
    const lang = languages.find((lang) => lang.code === i18n.language) || languages[0];
    setCurrentLanguage(lang.name);
  }, [i18n.language]);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left text-gray-600 hover:text-blue-600 flex items-center"
        >
          <Globe className="w-5 h-5 mr-2" />
          {currentLanguage}
        </button>

        {isOpen && (
          <div className="mt-2 pl-7 space-y-2 bg-white rounded-lg shadow-md p-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`block w-full text-left px-4 py-2 ${
                  language.code === i18n.language
                    ? "text-blue-600 font-medium bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {language.name}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <Globe className="w-5 h-5 mr-2" />
        {currentLanguage}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`block w-full text-left px-4 py-2 ${
                language.code === i18n.language
                  ? "text-blue-600 font-medium bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
