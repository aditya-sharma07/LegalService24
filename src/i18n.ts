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
      'Become a Consultant': 'Become a Consultant',

      // Document Upload
      'Please sign in to securely upload and manage your legal documents.': 'Please sign in to securely upload and manage your legal documents.',
      'Sign In to Continue': 'Sign In to Continue',

      // Case Tracking
      'Please sign in to access your case tracking dashboard.': 'Please sign in to access your case tracking dashboard.',

      // Reviews
      'Please sign in to view reviews': 'Please sign in to view reviews',
      'No reviews to display': 'No reviews to display',
      'Was this review helpful?': 'Was this review helpful?',
      'All Reviews': 'All Reviews',
      'Positive Only': 'Positive Only',
      'Critical Only': 'Critical Only'
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

      // Document Upload
      'Please sign in to securely upload and manage your legal documents.': 'कृपया अपने कानूनी दस्तावेज़ों को सुरक्षित रूप से अपलोड और प्रबंधित करने के लिए साइन इन करें।',
      'Sign In to Continue': 'जारी रखने के लिए साइन इन करें',

      // Case Tracking
      'Please sign in to access your case tracking dashboard.': 'कृपया अपने केस ट्रैकिंग डैशबोर्ड तक पहुंचने के लिए साइन इन करें।',

      // Reviews
      'Please sign in to view reviews': 'समीक्षाएं देखने के लिए साइन इन करें',
      'No reviews to display': 'दिखाने के लिए कोई समीक्षा नहीं है',
      'Was this review helpful?': 'क्या यह समीक्षा सहायक थी?',
      'All Reviews': 'सभी समीक्षाएं',
      'Positive Only': 'केवल सकारात्मक',
      'Critical Only': 'केवल आलोचनात्मक'
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

      // Document Upload
      'Please sign in to securely upload and manage your legal documents.': 'অনুগ্রহ করে আপনার আইনি নথিপত্র নিরাপদে আপলোড এবং পরিচালনা করতে সাইন ইন করুন।',
      'Sign In to Continue': 'চালিয়ে যেতে সাইন ইন করুন',

      // Case Tracking
      'Please sign in to access your case tracking dashboard.': 'আপনার মামলা ট্র্যাকিং ড্যাশবোর্ড অ্যাক্সেস করতে সাইন ইন করুন।',

      // Reviews
      'Please sign in to view reviews': 'রিভিউ দেখতে সাইন ইন করুন',
      'No reviews to display': 'প্রদর্শন করার জন্য কোন রিভিউ নেই',
      'Was this review helpful?': 'এই রিভিউটি কি সহায়ক ছিল?',
      'All Reviews': 'সমস্ত রিভিউ',
      'Positive Only': 'শুধুমাত্র ইতিবাচক',
      'Critical Only': 'শুধুমাত্র সমালোচনামূলক'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;