import React, { useState } from 'react';
import { ArrowLeft, Shield, Check, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';

interface InsuranceProps {
  onBack: () => void;
}

const Insurance: React.FC<InsuranceProps> = ({ onBack }) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    industry: '',
    currentCoverage: '',
    message: ''
  });
  const { isSignedIn, user } = useUser();

  const toggleFaq = (faqId: number) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleGetQuote = (plan: string) => {
    if (!isSignedIn) {
      toast.error('Please sign in to request a quote');
      return;
    }
    setSelectedPlan(plan);
    setShowQuoteForm(true);
    
    // Pre-fill form with user data if available
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your quote request has been submitted! Our team will contact you shortly.');
    setShowQuoteForm(false);
  };

  const insurancePlans = [
    {
      title: "Professional Liability Insurance",
      description: "Protects legal professionals against claims of negligence or failure to perform professional duties.",
      coverage: [
        "Legal defense costs",
        "Settlements and judgments",
        "Claims and damages",
        "Professional negligence",
        "Representation in court"
      ],
      price: "Starting at $99/month",
      popular: true
    },
    {
      title: "Cyber Liability Insurance",
      description: "Coverage for data breaches and cyber attacks that may compromise client information.",
      coverage: [
        "Data breach response",
        "Client notification costs",
        "Credit monitoring services",
        "Cyber extortion",
        "Regulatory defense and penalties"
      ],
      price: "Starting at $79/month",
      popular: false
    },
    {
      title: "Business Owner's Policy",
      description: "Comprehensive coverage combining general liability and property insurance for legal practices.",
      coverage: [
        "Property damage",
        "Business interruption",
        "General liability",
        "Equipment breakdown",
        "Valuable papers coverage"
      ],
      price: "Starting at $129/month",
      popular: false
    }
  ];

  const faqs = [
    {
      id: 1,
      question: "What types of insurance do legal professionals need?",
      answer: "Legal professionals typically need professional liability insurance (malpractice), general liability insurance, cyber liability insurance, and possibly business owner's policies depending on their practice size and structure."
    },
    {
      id: 2,
      question: "How much does legal professional insurance cost?",
      answer: "The cost varies based on factors like practice area, firm size, coverage limits, claims history, and location. Professional liability insurance typically ranges from $500-$5,000 annually for solo practitioners, with costs increasing for larger firms."
    },
    {
      id: 3,
      question: "Does professional liability insurance cover all types of claims?",
      answer: "No, professional liability insurance typically covers claims related to professional negligence, errors, and omissions. It may not cover intentional wrongdoing, criminal acts, or certain types of damages like punitive damages."
    },
    {
      id: 4,
      question: "Why do I need cyber liability insurance for my legal practice?",
      answer: "Legal practices handle sensitive client information. Cyber liability insurance protects against data breaches, ransomware attacks, and other cyber threats that could compromise client confidentiality and result in significant financial and reputational damage."
    },
    {
      id: 5,
      question: "Can I get insurance if I've had previous malpractice claims?",
      answer: "Yes, though previous claims may affect your premium rates or coverage terms. Be transparent about your claims history when applying, as insurers will discover this information during underwriting."
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

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Legal Professional Insurance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive insurance solutions designed specifically for legal professionals and law firms.
          </p>
        </div>

        {/* Insurance Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {insurancePlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${plan.popular ? 'border-2 border-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <Shield className="w-16 h-16 text-blue-600" />
                </div>
                
                <h2 className="text-xl font-bold text-center mb-4">{plan.title}</h2>
                <p className="text-gray-600 text-center mb-6">{plan.description}</p>
                
                <div className="text-center text-2xl font-bold text-blue-600 mb-6">
                  {plan.price}
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.coverage.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => handleGetQuote(plan.title)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Get a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Insurance</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Specialized Coverage</h3>
              <p className="text-gray-600">Tailored specifically for legal professionals and their unique risks.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
              <p className="text-gray-600">Affordable premiums with flexible payment options for all practice sizes.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Claims</h3>
              <p className="text-gray-600">Dedicated claims team with legal industry expertise for swift resolution.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-gray-600">Proactive resources to help prevent claims and protect your practice.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </button>
                
                {expandedFaq === faq.id && (
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quote Request Form Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Request a Quote: {selectedPlan}</h2>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company/Firm Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Employees
                      </label>
                      <select
                        name="employees"
                        value={formData.employees}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">Solo Practitioner</option>
                        <option value="2-5">2-5 employees</option>
                        <option value="6-10">6-10 employees</option>
                        <option value="11-20">11-20 employees</option>
                        <option value="21-50">21-50 employees</option>
                        <option value="50+">50+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Practice Area/Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Family Law">Family Law</option>
                        <option value="Criminal Law">Criminal Law</option>
                        <option value="Corporate Law">Corporate Law</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Intellectual Property">Intellectual Property</option>
                        <option value="Tax Law">Tax Law</option>
                        <option value="Immigration">Immigration</option>
                        <option value="General Practice">General Practice</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Insurance Coverage (if any)
                    </label>
                    <input
                      type="text"
                      name="currentCoverage"
                      value={formData.currentCoverage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Provider name, coverage limits, expiration date"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please share any specific requirements or questions you have about insurance coverage..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Quote Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insurance;