import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, Video, UserCheck, HelpCircle, MessageCircle, Clock, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Are the lawyers on LegalService24 verified?",
      answer: "Yes, all lawyers undergo a strict verification process including license checks and admin approval before appearing on the platform.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      question: "Is online consultation secure and private?",
      answer: "Absolutely. All consultations are end-to-end encrypted and your personal information is kept confidential.",
      icon: <Video className="w-6 h-6" />,
      color: "bg-green-50 text-green-600"
    },
    {
      question: "How do I find the right lawyer for my issue?",
      answer: "You can search by legal category or describe your issue to our AI assistant. It will match you with specialized lawyers instantly.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      question: "How do I start a consultation?",
      answer: "Click on 'Book Appointment', choose a consultation type (online/home/office), then select a lawyer and time slot.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600"
    },
    {
      question: "Can I contact a lawyer without booking?",
      answer: "To protect everyone's time and privacy, direct contact is allowed only after a confirmed booking.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-red-50 text-red-600"
    },
    {
      question: "What are the payment options available?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment is only processed after your consultation is confirmed.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Common Questions')}</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">{t('Frequently Asked Questions')}</h2>
          <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
            {t('Find answers to the most common questions about our legal services.')}
          </p>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left focus:outline-none p-6"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`${faq.color} p-3 rounded-full inline-flex items-center justify-center transition-transform duration-300`}>
                      {faq.icon}
                    </div>
                    <span className="font-semibold text-lg">{t(faq.question)}</span>
                  </div>
                  <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </button>
              
              {/* Improved animation with CSS transition */}
              <div
                id={`faq-answer-${index}`}
                style={{
                  maxHeight: openIndex === index ? '200px' : '0',
                  transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out, padding 0.3s ease',
                  opacity: openIndex === index ? 1 : 0,
                  overflow: 'hidden',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingBottom: openIndex === index ? '16px' : '0'
                }}
              >
                <div className="pl-16">
                  <p className="text-gray-600">{t(faq.answer)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;