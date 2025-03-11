import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const resources = {
  en: {
    translation: {
      // Navigation
      'Home': 'Home',
      'Blog': 'Blog',
      'Premium Plans': 'Premium Plans',
      'About': 'About',
      'Sign Up': 'Sign Up',
      'Login': 'Login',

      // Hero Section
      'Your Legal Consultation, Your Schedule!': 'Your Legal Consultation, Your Schedule!',
      'Talk to Our Legal Experts – Anytime, Anywhere.': 'Talk to Our Legal Experts – Anytime, Anywhere.',
      'Seamless Legal Consultations in Just a Few Clicks.': 'Seamless Legal Consultations in Just a Few Clicks.',
      'Expert legal solutions tailored to your needs. Available 24/7 for your peace of mind.': 'Expert legal solutions tailored to your needs. Available 24/7 for your peace of mind.',
      'Explore Services': 'Explore Services',

      // Stats
      'Clients Served': 'Clients Served',
      'Success Rate': 'Success Rate',
      'Years Experience': 'Years Experience',
      'Support': 'Support',

      // Features
      'Smart Legal Solutions': 'Smart Legal Solutions',
      'Innovative features designed to make your legal experience seamless and efficient.': 'Innovative features designed to make your legal experience seamless and efficient.',
      'Document Upload': 'Document Upload',
      'Legal Alerts': 'Legal Alerts',
      'Case Tracking': 'Case Tracking',
      'Multi-Language Support': 'Multi-Language Support',
      'Learn More': 'Learn More',

      // Services
      'Book Appointment Now': 'Book Appointment Now',
      'Comprehensive legal solutions designed to protect your interests and provide expert guidance when you need it most.': 'Comprehensive legal solutions designed to protect your interests and provide expert guidance when you need it most.',

      // Categories
      'Explore Legal Categories': 'Explore Legal Categories',
      'Choose from our wide range of legal categories to find the right solution for your needs.': 'Choose from our wide range of legal categories to find the right solution for your needs.',

      // Footer
      'Quick Links': 'Quick Links',
      'Services': 'Services',
      'Company': 'Company',
      'Follow Us': 'Follow Us',
      'Terms & Conditions': 'Terms & Conditions',
      'Careers': 'Careers',
      'Become a Consultant': 'Become a Consultant'
    }
  },
  hi: {
    translation: {
      // Navigation
      'Home': 'होम',
      'Blog': 'ब्लॉग',
      'Premium Plans': 'प्रीमियम प्लान',
      'About': 'हमारे बारे में',
      'Sign Up': 'साइन अप',
      'Login': 'लॉगिन',

      // Hero Section
      'Your Legal Consultation, Your Schedule!': 'आपकी कानूनी सलाह, आपकी सुविधा!',
      'Talk to Our Legal Experts – Anytime, Anywhere.': 'हमारे कानूनी विशेषज्ञों से बात करें – कभी भी, कहीं भी।',
      'Seamless Legal Consultations in Just a Few Clicks.': 'कुछ ही क्लिक में सरल कानूनी परामर्श।',
      'Expert legal solutions tailored to your needs. Available 24/7 for your peace of mind.': 'आपकी जरूरतों के अनुसार विशेषज्ञ कानूनी समाधान। आपकी मन की शांति के लिए 24/7 उपलब्ध।',
      'Explore Services': 'सेवाएं देखें',

      // Stats
      'Clients Served': 'सेवित ग्राहक',
      'Success Rate': 'सफलता दर',
      'Years Experience': 'वर्षों का अनुभव',
      'Support': 'सहायता',

      // Features
      'Smart Legal Solutions': 'स्मार्ट कानूनी समाधान',
      'Innovative features designed to make your legal experience seamless and efficient.': 'आपके कानूनी अनुभव को सरल और कुशल बनाने के लिए नवीन सुविधाएं।',
      'Document Upload': 'दस्तावेज़ अपलोड',
      'Legal Alerts': 'कानूनी अलर्ट',
      'Case Tracking': 'केस ट्रैकिंग',
      'Multi-Language Support': 'बहु-भाषा समर्थन',
      'Learn More': 'और जानें',

      // Services
      'Book Appointment Now': 'अभी अपॉइंटमेंट बुक करें',
      'Comprehensive legal solutions designed to protect your interests and provide expert guidance when you need it most.': 'आपके हितों की रक्षा और जरूरत के समय विशेषज्ञ मार्गदर्शन प्रदान करने के लिए व्यापक कानूनी समाधान।',

      // Categories
      'Explore Legal Categories': 'कानूनी श्रेणियां देखें',
      'Choose from our wide range of legal categories to find the right solution for your needs.': 'अपनी जरूरतों के लिए सही समाधान खोजने के लिए हमारी विस्तृत कानूनी श्रेणियों में से चुनें।',

      // Footer
      'Quick Links': 'त्वरित लिंक',
      'Services': 'सेवाएं',
      'Company': 'कंपनी',
      'Follow Us': 'हमें फॉलो करें',
      'Terms & Conditions': 'नियम और शर्तें',
      'Careers': 'करियर',
      'Become a Consultant': 'सलाहकार बनें'
    }
  },
  bn: {
    translation: {
      // Navigation
      'Home': 'হোম',
      'Blog': 'ব্লগ',
      'Premium Plans': 'প্রিমিয়াম প্ল্যান',
      'About': 'আমাদের সম্পর্কে',
      'Sign Up': 'সাইন আপ',
      'Login': 'লগইন',

      // Hero Section
      'Your Legal Consultation, Your Schedule!': 'আপনার আইনি পরামর্শ, আপনার সময়সূচি!',
      'Talk to Our Legal Experts – Anytime, Anywhere.': 'আমাদের আইনি বিশেষজ্ঞদের সাথে কথা বলুন - যেকোনো সময়, যেকোনো জায়গায়।',
      'Seamless Legal Consultations in Just a Few Clicks.': 'কয়েকটি ক্লিকেই সহজ আইনি পরামর্শ।',
      'Expert legal solutions tailored to your needs. Available 24/7 for your peace of mind.': 'আপনার প্রয়োজন অনুযায়ী বিশেষজ্ঞ আইনি সমাধান। আপনার মনের শান্তির জন্য 24/7 উপলব্ধ।',
      'Explore Services': 'সেবাগুলি দেখুন',

      // Stats
      'Clients Served': 'সেবাপ্রাপ্ত ক্লায়েন্ট',
      'Success Rate': 'সাফল্যের হার',
      'Years Experience': 'বছরের অভিজ্ঞতা',
      'Support': 'সহায়তা',

      // Features
      'Smart Legal Solutions': 'স্মার্ট আইনি সমাধান',
      'Innovative features designed to make your legal experience seamless and efficient.': 'আপনার আইনি অভিজ্ঞতাকে সহজ ও দক্ষ করার জন্য উদ্ভাবনী বৈশিষ্ট্য।',
      'Document Upload': 'ডকুমেন্ট আপলোড',
      'Legal Alerts': 'আইনি সতর্কতা',
      'Case Tracking': 'কেস ট্র্যাকিং',
      'Multi-Language Support': 'বহুভাষা সমর্থন',
      'Learn More': 'আরও জানুন'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['navigator'], // Detect browser language
      caches: ['localStorage', 'cookie'], // Cache the detected language
      convertDetectedLanguage: (lng) => lng.split('-')[0], // Normalize language codes (e.g., 'hi-IN' -> 'hi')
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;