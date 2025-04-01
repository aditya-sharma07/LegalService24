import React from 'react';
import { Award, Users, Briefcase, Globe, ShieldCheck, Clock, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Client-Centric",
      description: "We put our clients first in everything we do"
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Excellence",
      description: "We maintain the highest standards of legal service"
    },
    {
      icon: <Briefcase className="w-12 h-12 text-blue-600" />,
      title: "Integrity",
      description: "We uphold ethical practices and transparency"
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: "Innovation",
      description: "We embrace technology to improve our services"
    }
  ];

  const whyChooseUs = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-green-600" />,
      title: "100% Secure & Confidential",
      description: "Your legal matters are handled with complete privacy and security."
    },
    {
      icon: <Clock className="w-12 h-12 text-green-600" />,
      title: "24/7 Availability",
      description: "We are here whenever you need legal assistance, day or night."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-600" />,
      title: "Hassle-Free Documentation",
      description: "No more legal paperwork stress – we handle everything for you."
    },
    {
      icon: <Star className="w-12 h-12 text-green-600" />,
      title: "Trusted by Thousands",
      description: "Join thousands of satisfied clients who trust our legal expertise."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About LegalService24</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make quality legal services accessible to everyone through
            technology and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, LegalService24 has grown from a small legal consultancy to
              a leading provider of comprehensive legal services. Our journey has been
              driven by a commitment to innovation and accessibility in legal services.
            </p>
            <p className="text-gray-600">
              Today, we serve thousands of clients worldwide, combining traditional legal
              expertise with cutting-edge technology to deliver exceptional service.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Legal team meeting"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose LegalService24?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center bg-white shadow-lg p-6 rounded-lg">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 rounded-lg mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">LegalService24</h3>
                <p className="text-gray-400">Your trusted legal partner, available 24/7.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                  <li><button onClick={() => navigate('/explore-services')} className="text-gray-400 hover:text-white transition-colors">Services</button></li>
                  <li><button onClick={() => navigate('/premium-services')} className="text-gray-400 hover:text-white transition-colors">Premium</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-gray-400">contact@legalservice24.com</li>
                  <li className="text-gray-400">+1 (555) 123-4567</li>
                  <li className="text-gray-400">123 Legal Street, NY</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} LegalService24. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default About;