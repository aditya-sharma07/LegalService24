import React from 'react';
import { FileText, Shield, ArrowLeft, Check } from 'lucide-react';

interface PremiumServicesProps {
  onBack: () => void;
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ onBack }) => {
  const documentServices = [
    {
      title: "Basic Document Review",
      price: "$199",
      features: [
        "Contract review",
        "Document proofreading",
        "Basic legal analysis",
        "48-hour turnaround"
      ]
    },
    {
      title: "Comprehensive Document Package",
      price: "$499",
      features: [
        "Full contract drafting",
        "Multiple revisions",
        "Legal consultation",
        "24-hour turnaround",
        "Priority support"
      ]
    }
  ];

  const protectionPlans = [
    {
      title: "Business Essentials",
      price: "$299/month",
      features: [
        "Basic legal consultation",
        "Document review",
        "Annual legal checkup",
        "Email support"
      ]
    },
    {
      title: "Enterprise Protection",
      price: "$799/month",
      features: [
        "Unlimited consultations",
        "Priority document handling",
        "Dedicated legal team",
        "24/7 emergency support",
        "Quarterly legal audits"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Document Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {documentServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <FileText className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{service.price}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-12 text-center">Legal Protection Plans</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {protectionPlans.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <Shield className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PremiumServices;