import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Users, Globe, Award, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface CareersProps {
  onBack: () => void;
}

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

const Careers: React.FC<CareersProps> = ({ onBack }) => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });

  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Senior Legal Consultant",
      department: "Legal Advisory",
      location: "New Delhi, India",
      type: "Full-time",
      description: "We're looking for an experienced legal consultant to join our team and provide expert advice to our clients on various legal matters.",
      requirements: [
        "Juris Doctor (JD) or equivalent legal degree",
        "5+ years of experience in legal practice",
        "Strong knowledge of Indian legal system",
        "Excellent communication and client management skills",
        "Bar admission in relevant jurisdiction"
      ],
      responsibilities: [
        "Provide legal consultations to clients",
        "Review and draft legal documents",
        "Represent clients in legal proceedings when necessary",
        "Stay updated on legal developments and precedents",
        "Collaborate with other legal professionals on complex cases"
      ]
    },
    {
      id: 2,
      title: "Legal Content Writer",
      department: "Content & Marketing",
      location: "Mumbai, India",
      type: "Full-time",
      description: "Join our content team to create informative and engaging legal content for our blog, website, and educational materials.",
      requirements: [
        "Bachelor's degree in Law, Journalism, or related field",
        "2+ years of experience in content writing, preferably in legal domain",
        "Strong understanding of legal concepts and terminology",
        "Excellent writing and editing skills",
        "SEO knowledge is a plus"
      ],
      responsibilities: [
        "Create high-quality legal articles, guides, and blog posts",
        "Simplify complex legal concepts for general audience",
        "Collaborate with legal experts to ensure accuracy",
        "Optimize content for search engines",
        "Stay updated on legal trends and news"
      ]
    },
    {
      id: 3,
      title: "Legal Tech Developer",
      department: "Technology",
      location: "Bangalore, India",
      type: "Full-time",
      description: "Help us build innovative legal technology solutions to improve access to justice and streamline legal processes.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Proficiency in React, Node.js, and modern web technologies",
        "Understanding of legal processes is a plus",
        "Experience with AI/ML technologies is desirable"
      ],
      responsibilities: [
        "Develop and maintain our legal service platform",
        "Create user-friendly interfaces for clients and legal professionals",
        "Implement secure document management systems",
        "Collaborate with legal experts to understand requirements",
        "Continuously improve platform performance and features"
      ]
    }
  ];

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Application submitted successfully! We will contact you soon.');
    setShowApplicationForm(false);
    setSelectedJob(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: ''
    });
  };

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
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a mission to make quality legal services accessible to everyone through innovation and expertise.
          </p>
        </div>

        {/* Why Join Us Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Join LegalService24?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meaningful Work</h3>
              <p className="text-gray-600">Make a real difference in people's lives by improving access to legal services.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
              <p className="text-gray-600">Work with talented professionals in a supportive and inclusive environment.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation Focus</h3>
              <p className="text-gray-600">Be at the forefront of legal technology and service innovation.</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">Continuous learning and career advancement in a growing company.</p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Open Positions</h2>
          
          <div className="space-y-4">
            {jobPositions.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleJobExpansion(job.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.department} • {job.location} • {job.type}</p>
                    </div>
                    <div>
                      {expandedJob === job.id ? (
                        <ChevronUp className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedJob === job.id && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="text-gray-700">{resp}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Apply Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Apply for {selectedJob.title}</h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
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
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume/CV
                    </label>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleFormChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Application
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

export default Careers;