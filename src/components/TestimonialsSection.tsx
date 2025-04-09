import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  
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

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 bg-blue-50 px-4 py-1 rounded-full">
            <span className="text-blue-600 font-medium">{t('Trusted by Clients')}</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">{t('What Our Clients Say')}</h2>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Large quote mark */}
          <div className="absolute text-blue-100 -top-10 left-4">
            <Quote size={80} />
          </div>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="relative overflow-hidden" style={{ height: "320px" }}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="absolute inset-0 p-10 flex flex-col md:flex-row items-center transition-all duration-500"
                  style={{
                    opacity: index === activeIndex ? 1 : 0,
                    transform: `translateX(${(index - activeIndex) * 100}%)`,
                    pointerEvents: index === activeIndex ? 'auto' : 'none'
                  }}
                >
                  <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full">
                        <Quote size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-3/4 md:pl-8 text-center md:text-left">
                    <p className="text-gray-600 italic text-lg mb-6">"{t(testimonial.text)}"</p>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{t(testimonial.role)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;