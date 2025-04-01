import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, Briefcase, Globe, Home, Gavel, Scale, PenTool, ScrollText, ArrowRight } from "lucide-react";

const ExploreServices: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      category: "Legal Document Preparation",
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      plans: [
        {
          title: "Standard Documents",
          price: "$199",
          features: ["Drafting contracts", "Affidavits & agreements", "Basic legal review", "3-day turnaround"],
        },
        {
          title: "Customized Documents",
          price: "$399",
          features: ["Tailored contracts & policies", "Unlimited revisions", "24-hour turnaround", "Direct consultation"],
        },
      ],
    },
    {
      category: "Notary Services",
      icon: <Scale className="w-12 h-12 text-green-600" />,
      plans: [
        {
          title: "Basic Notary",
          price: "$50",
          features: ["Document notarization", "Official witness", "Certified copies", "Remote notary available"],
        },
        {
          title: "Mobile Notary",
          price: "$149",
          features: ["Home/office visits", "Bulk notarization", "Emergency service", "Legal consultation included"],
        },
      ],
    },
    {
      category: "Business Legal Services",
      icon: <Briefcase className="w-12 h-12 text-orange-600" />,
      plans: [
        {
          title: "Startup Legal Package",
          price: "$299",
          features: ["Company registration", "Terms & Conditions", "Basic compliance", "IP protection guidance"],
        },
        {
          title: "Corporate Legal Support",
          price: "$799",
          features: ["Legal audits", "Contract negotiations", "Employment law compliance", "Mergers & acquisitions"],
        },
      ],
    },
    {
      category: "Immigration Services",
      icon: <Globe className="w-12 h-12 text-purple-600" />,
      plans: [
        {
          title: "Visa & Work Permits",
          price: "$499",
          features: ["Visa application assistance", "Work permit processing", "Residency guidance", "Immigration consultancy"],
        },
        {
          title: "Citizenship & Green Card",
          price: "$999",
          features: ["Naturalization process", "Legal representation", "Family sponsorship", "Expedited processing"],
        },
      ],
    },
    {
      category: "Real Estate Legal Services",
      icon: <Home className="w-12 h-12 text-red-600" />,
      plans: [
        {
          title: "Property Transactions",
          price: "$349",
          features: ["Deed drafting", "Title searches", "Lease agreements", "Home-buying legal advice"],
        },
        {
          title: "Landlord & Tenant Law",
          price: "$599",
          features: ["Eviction support", "Rental contract disputes", "Tenant rights protection", "Legal representation"],
        },
      ],
    },
    {
      category: "Intellectual Property (IP) Services",
      icon: <PenTool className="w-12 h-12 text-indigo-600" />,
      plans: [
        {
          title: "Trademark Registration",
          price: "$299",
          features: ["Trademark search", "Filing with USPTO", "Legal guidance", "Approval tracking"],
        },
        {
          title: "Patent Filing",
          price: "$799",
          features: ["Patent drafting", "Filing with authorities", "Legal protections", "Licensing assistance"],
        },
      ],
    },
    {
      category: "Legal Aid & Pro Bono Services",
      icon: <Gavel className="w-12 h-12 text-yellow-600" />,
      plans: [
        {
          title: "Free Legal Consultation",
          price: "Free",
          features: ["30-minute legal consultation", "Basic case evaluation", "Legal advice", "Resource assistance"],
        },
        {
          title: "Full Representation",
          price: "Varies",
          features: ["Court representation", "Appeals & disputes", "Government assistance", "Non-profit support"],
        },
      ],
    },
    {
      category: "Legal Compliance & Risk Management",
      icon: <Shield className="w-12 h-12 text-gray-600" />,
      plans: [
        {
          title: "Regulatory Compliance",
          price: "$499",
          features: ["GDPR compliance", "Data privacy policies", "Risk assessments", "Legal training sessions"],
        },
        {
          title: "Risk Management Strategy",
          price: "$999",
          features: ["Crisis management", "Dispute resolution", "Litigation prevention", "Comprehensive audits"],
        },
      ],
    },
    {
      category: "Legal Translation Services",
      icon: <ScrollText className="w-12 h-12 text-pink-600" />,
      plans: [
        {
          title: "Standard Translation",
          price: "$99",
          features: ["Legal document translation", "Certified translators", "Multi-language support", "24-hour turnaround"],
        },
        {
          title: "Certified Translations",
          price: "$249",
          features: ["Notarized translations", "Official legal use", "Court-approved documents", "Priority delivery"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our Legal Services</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Comprehensive legal solutions tailored to your needs. Choose from our range of
          specialized services designed to protect your interests.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <section key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                {service.icon}
                <h2 className="text-3xl font-bold ml-4">{service.category}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {service.plans.map((plan, planIndex) => (
                  <div key={planIndex} className="border rounded-xl p-6 hover:border-blue-500 transition-colors">
                    <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => navigate(`/service-details/${service.category.toLowerCase().replace(/\s+/g, '-')}/${plan.title.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreServices;