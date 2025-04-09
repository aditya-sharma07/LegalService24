import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const ContactSection: React.FC = () => {
  const { t } = useTranslation();

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

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Get In Touch')}</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">{t('Contact Us')}</h2>
          <p className="text-lg text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            {t('Need legal assistance? Fill out the form below, and we\'ll get back to you.')}
          </p>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Contact Info */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8">
              <h3 className="text-xl font-semibold mb-6">{t('Contact Information')}</h3>
              <p className="mb-8 text-blue-100">
                {t('Our team is ready to assist you with any legal questions or concerns.')}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-10 p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">{t('Email')}</p>
                    <p className="font-medium">contact@legalservice24.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-10 p-3 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">{t('Phone')}</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-10 p-3 rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">{t('Address')}</p>
                    <p className="font-medium">123 Legal Street, NY</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-medium mb-4">{t('Follow Us')}</h4>
                <div className="flex space-x-4">
                  {['LinkedIn', 'Twitter', 'Facebook'].map((platform, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className="bg-white bg-opacity-10 p-2 rounded-full hover:bg-opacity-20 transition-all"
                    >
                      {platform[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-3 p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">{t('Send a Message')}</h3>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Full Name')}</label>
                    <input
                      type="text"
                      name="name"
                      placeholder={t('John Doe')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('Email Address')}</label>
                    <input
                      type="email"
                      name="email"
                      placeholder={t('your@email.com')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t('How can we help you?')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('Message')}</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t('Your message here...')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium w-full md:w-auto"
                >
                  {t('Send Message')}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;