import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'; // Import Router components
import { Search, Calendar, FileText, Shield, ChevronDown, X, Menu, Phone, Mail, MapPin, Clock, Award, Users, BookOpen, ArrowRight, MessageSquare, Globe, CheckCircle, Bell, FileCheck, Languages } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import LawyerSelection from './components/LawyerSelection';
import PremiumServices from './components/PremiumServices';
import About from './components/About';
import Logo from './components/Logo';
import ExploreServices from './components/ExploreServices';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Blog from './components/Blog';
import toast from 'react-hot-toast';
import TermsConditions from './components/TermsConditions';
import Careers from './components/Careers';
import BecomeConsultant from './components/BecomeConsultant'; 
import Insurance from './components/Insurance';
import DocumentUpload from './components/DocumentUpload';
import CaseTracking from './components/CaseTracking';
import LawyerReviews from './components/LawyerReviews';
import LanguageSelector from './components/LanguageSelector';
import Notifications from './components/Notifications';
import AdminPanel from './components/AdminPanel';
import LawyerDashboard from "./components/LawyerDashboard";
import { useTranslation } from 'react-i18next';
import { supabase } from "./lib/supabase";
import "./i18n"; // Import the i18n configuration

type Page = 'home' | 'lawyer-selection' | 'premium' | 'about' | 'explore-services' | 'blog' | 'terms' | 'careers' | 'become-consultant' | 'insurance' | 'document-upload' | 'case-tracking' | 'lawyer-reviews' | 'notifications';



function App() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPremiumMenuOpen, setIsPremiumMenuOpen] = useState(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState<number | null>(null);
  const { isSignedIn, user } = useUser();
  const { t } = useTranslation();
  
  // ✅ Added state for specialization and subcategory
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null); // ✅ Fix
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null); // ✅ Fix
  
  
  
  const taglines = [
    "Your Legal Consultation, Your Schedule!",
    "Talk to Our Legal Experts – Anytime, Anywhere.",
    "Seamless Legal Consultations in Just a Few Clicks."
  ];

  const lawCategories = [
    {
      type: "Civil Law",
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

  const services = [
    {
      title: "Online Consultation",
      description: "Connect with expert lawyers from the comfort of your home",
      icon: <Calendar className="w-8 h-8" />,
      lawyer: "Sarah Johnson",
      price: "$99/hour",
      bgColor: "bg-blue-50",
      action: "Book Now"
    },
    {
      title: "Home Appointment",
      description: "Our experts will visit you at your home for consultation.",
      icon: <FileText className="w-8 h-8" />,
      lawyer: "Michael Chen",
      price: "$199/Appointment",
      bgColor: "bg-green-50",
      action: "Schedule a Visit"
    },
    {
      title: "Office Appointment",
      description: "Meet our legal professionals at our office.",
      icon: <Shield className="w-8 h-8" />,
      lawyer: "David Smith",
      price: "$299/Appointment",
      bgColor: "bg-purple-50",
      action: "Visit Office"
    }
  ];

  const testimonials = [
    {
      text: "LegalService24 made getting legal advice incredibly convenient. Their online consultation saved me hours of travel time.",
      author: "John Doe",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      text: "The document preparation service was thorough and professional. Highly recommended!",
      author: "Emily Wilson",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    },
    {
      text: "Outstanding legal support that truly understands modern business needs.",
      author: "Michael Chang",
      role: "Tech Entrepreneur",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Clients Served" },
    { icon: <Award className="w-6 h-6" />, value: "98%", label: "Success Rate" },
    { icon: <BookOpen className="w-6 h-6" />, value: "20+", label: "Years Experience" },
    { icon: <Clock className="w-6 h-6" />, value: "24/7", label: "Support" }
  ];

 
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Available 24/7 for urgent matters"
    },
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email",
      details: "contact@legalservice24.com",
      description: "Response within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: "Office Location",
      details: "123 Legal Street, NY",
      description: "Open Monday-Friday, 9AM-6PM"
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-600" />,
      title: "Global Service",
      details: "Available Worldwide",
      description: "Online consultations for all time zones"
    }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", url: "https://instagram.com" }
  ];

  const features = [
    {
      icon: <FileCheck className="w-12 h-12 text-blue-600" />,
      title: "Document Upload",
      description: "Securely upload and share legal documents with your lawyer",
      action: () => setCurrentPage('document-upload')
    },
    {
      icon: <Bell className="w-12 h-12 text-blue-600" />,
      title: "Legal Alerts",
      description: "Stay updated with case progress and important legal changes",
      action: () => setCurrentPage('notifications')
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Case Tracking",
      description: "Monitor the status of your legal matters in real-time",
      action: () => setCurrentPage('case-tracking')
    },
    {
      icon: <Languages className="w-12 h-12 text-blue-600" />,
      title: "Multi-Language Support",
      description: "Access legal services in your preferred language",
      action: () => null // Language selector is in the header
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedSpecialization && selectedSubcategory) {
      console.log(`Navigating to Lawyer Selection for: ${selectedSpecialization} - ${selectedSubcategory}`);
      setCurrentPage('lawyer-selection');  
    }
  }, [selectedSpecialization, selectedSubcategory]);

  
  
  

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const navigateToHome = () => {
    console.log("Navigating to Home...");
    setCurrentPage('home');
    setSelectedService(null);
    setSelectedCategory(null);
    setSelectedSpecialization(null); // ✅ Ensure specialization is reset
    setSelectedSubcategory(null); // ✅ Ensure subcategory is reset
  };

  const navigateToPage = (page: Page) => { // ✅ Ensure 'page' is of type Page
    console.log(`Navigating to: ${page}`);
    setSelectedService(null);
    setSelectedCategory(null);
    setSelectedSpecialization(null);
    setSelectedSubcategory(null);
    setCurrentPage(page); // ✅ No error now
  };

  const handleBookAppointment = (service: string) => {
    console.log(`Booking appointment for: ${service}`);
  
    // ✅ Ensure specialization and subcategory are set before navigation
    setSelectedSpecialization('General Consultation'); // Set a default specialization
    setSelectedSubcategory(service); // Use the selected service as subcategory
  
    setCurrentPage('lawyer-selection'); // ✅ Navigate to Lawyer Selection page
  };
  
  

  const handleSubcategoryClick = (subcategory: string, specialization: string) => {
    console.log(`Selected Specialization: ${specialization}, Subcategory: ${subcategory}`);
    setSelectedSpecialization(specialization);
    setSelectedSubcategory(subcategory);
    setCurrentPage("lawyer-selection");
  };
  
  
  const handlePremiumMenuToggle = () => {
    setIsPremiumMenuOpen(!isPremiumMenuOpen);
  };

  const handleViewLawyerReviews = (lawyerId: number) => {
    setSelectedLawyerId(lawyerId);
    setCurrentPage('lawyer-reviews');
  };

  

  const renderPage = () => {
    // ✅ Updated LawyerSelection props to use specialization and subcategory
    if (selectedSpecialization && selectedSubcategory) {
      return (
        <LawyerSelection
          specialization={selectedSpecialization}
          subcategory={selectedSubcategory}
          onBack={navigateToHome}
          onViewReviews={handleViewLawyerReviews}
        />
      );
    }

  

    switch (currentPage) {
      case 'premium':
        return <PremiumServices onBack={navigateToHome} />;
      case 'about':
        return <About onBack={navigateToHome} />;
      case 'explore-services':
        return <ExploreServices onBack={navigateToHome} />;
      case 'blog':
        return <Blog onBack={navigateToHome} />;
      case 'terms':
        return <TermsConditions onBack={navigateToHome} />;
      case 'careers':
        return <Careers onBack={navigateToHome} />;
      case 'insurance':
        return <Insurance onBack={navigateToHome} />;
      case 'document-upload':
        return <DocumentUpload onBack={navigateToHome} />;
      case 'case-tracking':
        return <CaseTracking onBack={navigateToHome} />;
      case 'lawyer-reviews':
        return <LawyerReviews lawyerId={selectedLawyerId} onBack={navigateToHome} />;
      case 'notifications':
        return <Notifications onBack={navigateToHome} />;
      default:
        return (
          <>
            {/* Hero Section */}
            <div 
              className="pt-16 relative bg-cover bg-center h-screen flex items-center"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")'
              }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 transition-opacity duration-500">
                  {t(taglines[currentTagline])}
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  {t('Expert legal solutions tailored to your needs. Available 24/7 for your peace of mind.')}
                </p>
                <button 
                  onClick={() => setCurrentPage('explore-services')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  {t('Explore Services')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-600 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center text-white">
                      <div className="flex justify-center mb-2">{stat.icon}</div>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-blue-100">{t(stat.label)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-4">{t('Smart Legal Solutions')}</h2>
                <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
                  {t('Innovative features designed to make your legal experience seamless and efficient.')}
                </p>
                <div className="flex justify-center mb-12">
                  <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center cursor-pointer"
                      onClick={feature.action}
                    >
                      <div className="flex justify-center mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{t(feature.title)}</h3>
                      <p className="text-gray-600 mb-4">{t(feature.description)}</p>
                      {feature.title !== "Multi-Language Support" && (
                        <button
                          className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto"
                        >
                          {t('Learn More')}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Section */}
                        <div id="services" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-4">{t('Book Appointment Now')}</h2>
                <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
                  {t('Comprehensive legal solutions designed to protect your interests and provide expert guidance when you need it most.')}
                </p>
                <div className="flex justify-center mb-12">
                  <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {services.map((service, index) => (
                    <div 
                      key={index} 
                      className={`${service.bgColor} p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <div className="text-blue-600 mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{t(service.title)}</h3>
                      <p className="text-gray-600 mb-4">{t(service.description)}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">{service.lawyer}</span>
                        <span className="font-semibold text-blue-600">{service.price}</span>
                      </div>
                      <button
                        onClick={() => handleBookAppointment(service.title)} // ✅ Correct function call
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        {t(service.action)}
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Civil and Criminal Law Categories Section */}
            <div className="py-12 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    {t('Explore Legal Categories')}
                  </h2>
                  <p className="text-base text-gray-600 max-w-2xl mx-auto">
                    {t('Choose from our wide range of legal categories to find the right solution for your needs.')}
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {lawCategories.map((category, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
                      <h3 className="text-2xl font-semibold text-blue-600 mb-6 pb-2 border-b border-blue-200">{t(category.type)}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {category.subcategories.map((subcategory, subIndex) => (
                          <div key={subIndex} className="mb-2">
                            <button 
                            onClick={() => handleSubcategoryClick(subcategory, category.type)}
                            className="flex items-center gap-2 hover:text-blue-600 transition-colors w-full text-left group"
                          >

                              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{t(subcategory)}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Testimonials */}
<div className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-12">{t('What Our Clients Say')}</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.author} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{t(testimonial.role)}</p>
            </div>
          </div>
          <p className="text-gray-600 italic">"{t(testimonial.text)}"</p>
        </div>
      ))}
    </div>
  </div>
</div>

            

            {/* Contact Section */}
            <div className="py-12 bg-gray-50">
              <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{t('Contact Us')}</h2>
                <p className="text-lg text-gray-600 text-center mb-8">
                  {t('Need legal assistance? Fill out the form below, and we\'ll get back to you.')}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Form */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        placeholder={t('Full Name')}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder={t('Email Address')}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        name="message"
                        rows={3}
                        placeholder={t('Your Message')}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                      >
                        {t('Send Message')}
                      </button>
                    </form>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <p className="text-gray-700">contact@legalservice24.com</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <p className="text-gray-700">+1 (555) 123-4567</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <p className="text-gray-700">123 Legal Street, NY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer section */}
           <footer className="bg-gray-800 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-between">
                  <div className="w-full md:w-auto mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-4">LegalService24</h3>
                    <p className="text-gray-400">Your trusted legal partner, available 24/7.</p>
                  </div>
                  
                  <div className="w-1/2 sm:w-auto mb-6 md:mb-0">
                    <h4 className="font-semibold mb-4">{t('Quick Links')}</h4>
                    <ul className="space-y-2">
                      <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors">{t('About')}</button></li>
                      <li><button onClick={() => setCurrentPage('explore-services')} className="text-gray-400 hover:text-white transition-colors">{t('Services')}</button></li>
                      <li><button onClick={() => setCurrentPage('blog')} className="text-gray-400 hover:text-white transition-colors">{t('Blog')}</button></li>
                    </ul>
                  </div>
                  
                  <div className="w-1/2 sm:w-auto mb-6 md:mb-0">
                    <h4 className="font-semibold mb-4">{t('Services')}</h4>
                    <ul className="space-y-2">
                      <li><button onClick={() => setSelectedService('Online Consultation')} className="text-gray-400 hover:text-white transition-colors">{t('Online Consultation')}</button></li>
                      <li><button onClick={() => setSelectedService('Home Appointment')} className="text-gray-400 hover:text-white transition-colors">{t('Home Appointment')}</button></li>
                      <li><button onClick={() => setSelectedService('Office Appointment')} className="text-gray-400 hover:text-white transition-colors">{t('Office Appointment')}</button></li>
                    </ul>
                  </div>
                        
                  <div className="w-1/2 sm:w-auto">
                    <h4 className="font-semibold mb-4">{t('Company')}</h4>
                    <ul className="space-y-2">
                      <li><button onClick={() => setCurrentPage('terms')} className="text-gray-400 hover:text-white transition-colors">{t('Terms & Conditions')}</button></li>
                      <li><button onClick={() => setCurrentPage('careers')} className="text-gray-400 hover:text-white transition-colors">{t('Careers')}</button></li>
                      <li><a
                        href="/become-consultant" // Link to the BecomeConsultant page
                        target="_blank" // Open in a new tab
                        rel="noopener noreferrer" // Security best practice for target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {t('Become a Consultant')}
                      </a></li>
                    </ul>
                  </div>
                </div>
                
                {/* Follow Us Section */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h4 className="font-semibold mb-4 text-center">{t('Follow Us')}</h4>
                  <div className="flex justify-center space-x-6">
                    {socialLinks.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                  <p>&copy; {new Date().getFullYear()} LegalService24. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        );
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Toaster position="top-right" />
            {!isSignedIn && (
              <>
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
              </>
            )}
            
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white shadow-md z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      
      {/* Logo - Navigates to Home */}
      <div className="flex items-center">
        <Logo onClick={() => navigateToPage('home')} />
      </div>
      
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <button onClick={() => navigateToPage('home' as Page)} className="text-gray-600 hover:text-blue-600 transition-colors">
          {t('Home')}
        </button>
        <button onClick={() => navigateToPage('blog' as Page)} className="text-gray-600 hover:text-blue-600 transition-colors">
          {t('Blog')}
        </button>
        
       
                    
                    {/* Premium Plans Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={handlePremiumMenuToggle}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {t('Premium Plans')}
                        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPremiumMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isPremiumMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                          <button 
                            onClick={() => {
                              navigateToPage('premium' as Page); // ✅ Uses navigateToPage for correct state reset
                              setIsPremiumMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {t('Document Services')}
                          </button>
                          <button 
                            onClick={() => {
                              navigateToPage('premium' as Page);
                              setIsPremiumMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {t('Legal Protection Plans')}
                          </button>
                          <button 
                            onClick={() => {
                              navigateToPage('insurance' as Page);
                              setIsPremiumMenuOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {t('Insurance')}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* About Page Button */}
                    <button 
                      onClick={() => navigateToPage('about' as Page)} // ✅ Now correctly navigates
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {t('About')}
                    </button>


                    {/* Language Selector */}
                    <LanguageSelector />
                    
                    {isSignedIn && (
                      <button
                        onClick={() => setCurrentPage('notifications')}
                        className="relative text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Bell className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          3
                        </span>
                      </button>
                    )}
                    
                    {isSignedIn ? (
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Hi, {user?.firstName}</span>
                        <UserButton />
                      </div>
                    ) : (
                      <>
                        <SignUpButton mode="modal">
                          <button className="text-gray-600 hover:text-blue-600 transition-colors">
                            {t('Sign Up')}
                          </button>
                        </SignUpButton>
                        <SignInButton mode="modal">
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            {t('Login')}
                          </button>
                        </SignInButton>
                      </>
                    )}
                  </div>

                  <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </div>
              </div>
            </nav>

           {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden fixed top-16 w-full bg-white shadow-md z-40">
                <div className="px-4 py-2 space-y-4">
                  <button 
                    onClick={() => {
                      navigateToPage('home' as Page); // ✅ Uses navigateToPage
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('Home')}
                  </button>
                  <button 
                    onClick={() => {
                      navigateToPage('blog' as Page);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('Blog')}
                  </button>
                  {/* <button 
                    onClick={() => {
                      navigateToPage('about' as Page);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('About')}
                  </button> */}
                  
                  {/* Mobile Premium Plans Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsPremiumMenuOpen(!isPremiumMenuOpen)}
                      className="flex items-center w-full text-left text-gray-600 hover:text-blue-600"
                    >
                      {t('Premium Plans')}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isPremiumMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isPremiumMenuOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        <button 
                          onClick={() => {
                            navigateToPage('premium' as Page); // ✅ Uses navigateToPage
                            setIsMenuOpen(false);
                            setIsPremiumMenuOpen(false);
                          }}
                          className="block w-full text-left text-gray-600 hover:text-blue-600"
                        >
                          {t('Document Services')}
                        </button>
                        <button 
                          onClick={() => {
                            navigateToPage('premium' as Page);
                            setIsMenuOpen(false);
                            setIsPremiumMenuOpen(false);
                          }}
                          className="block w-full text-left text-gray-600 hover:text-blue-600"
                        >
                          {t('Legal Protection Plans')}
                        </button>
                        <button 
                          onClick={() => {
                            navigateToPage('insurance' as Page);
                            setIsMenuOpen(false);
                            setIsPremiumMenuOpen(false);
                          }}
                          className="block w-full text-left text-gray-600 hover:text-blue-600"
                        >
                          {t('Insurance')}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* About Page Button */}
                  <button 
                    onClick={() => {
                      navigateToPage('about' as Page);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-600 hover:text-blue-600"
                  >
                    {t('About')}
                  </button>


                  {/* Language Selector */}
                  <LanguageSelector isMobile={true} />
                  
                  {isSignedIn ? (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Hi, {user?.firstName}</span>
                      <UserButton />
                    </div>
                  ) : (
                    <>
                      <SignUpButton mode="modal">
                        <button className="block w-full text-left text-gray-600 hover:text-blue-600">
                          {t('Sign Up')}
                        </button>
                      </SignUpButton>
                      <SignInButton mode="modal">
                        <button className="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          {t('Login')}
                        </button>
                      </SignInButton>
                    </>
                  )}
                </div>
              </div>
            )}

            {renderPage()}
          </div>
        } />
         {/* Lawyer & Admin Pages (Open in a New Tab) */}
        <Route path="/become-consultant" element={<BecomeConsultant />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;