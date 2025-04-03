import { useState, useRef } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { Briefcase, CheckCircle, Shield, UserPlus, Phone, Mail, ChevronRight, Award, Star, Clock } from "lucide-react"; 

const BecomeConsultant = () => {
  // Fixed the ref type by specifying HTMLDivElement
  const registrationFormRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Civil Law",
    subcategory: "",
    experience: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const civilSubcategories = [
    "Family & Matrimony Advice", "Banking & Corporate Matters",
    "Employment & Labor Matters", "Property Disputes",
    "Send a Demand Notice", "Draft Agreement",
    "Review Property Papers", "Partition Suit",
    "Consumer Disputes", "Intellectual Property Rights"
  ];

  const criminalSubcategories = [
    "Cheque Bounce Cases", "Domestic Violence",
    "Sexual Harassment at Workplace", "Fraud & Cybercrime",
    "Theft & Robbery", "Assault & Battery",
    "Drug Offenses", "White-Collar Crimes",
    "Criminal Defense", "Bail Applications"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const { error } = await supabase.from("consultants").insert([
      {
        ...formData,
        status: "Pending", // ✅ Ensure new lawyers are pending
      },
    ]);

    if (error) {
      toast.error("Error registering. Try again!");
    } else {
      toast.success("Successfully registered as a consultant!");
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        specialization: "Civil Law",
        subcategory: "",
        experience: "",
        contact: "",
      });
    }
    setLoading(false);
  };

  const scrollToRegistration = () => {
    if (registrationFormRef.current) {
      registrationFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
      {/* Hero Section with background image */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 text-white">Elevate Your Legal Practice</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto text-blue-100">
            Join LegalService24's network of elite professionals and connect with clients seeking your expertise.
          </p>
          <button onClick={scrollToRegistration} 
                  className="mt-8 px-8 py-3 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all flex items-center mx-auto">
            Get Started <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Stats/Social Proof */}
      <div className="bg-white shadow-lg py-6 mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-700">2,500+</p>
            <p className="text-gray-600">Active Consultants</p>
          </div>
          <div className="p-4 border-l border-r border-gray-200">
            <p className="text-3xl font-bold text-blue-700">85%</p>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-700">₹50Cr+</p>
            <p className="text-gray-600">Consultant Earnings</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Why Leading Lawyers Choose Us</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Join thousands of legal professionals who are growing their practice and reaching new clients through our platform.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-all">
            <Shield className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Secure & Verified Clients</h3>
            <p className="text-gray-600">We pre-screen all clients, ensuring you only work with legitimate cases that match your expertise.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-green-600 hover:shadow-xl transition-all">
            <Briefcase className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expand Your Practice</h3>
            <p className="text-gray-600">Gain access to a steady stream of clients actively seeking legal expertise in your specialization.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-purple-600 hover:shadow-xl transition-all">
            <UserPlus className="text-purple-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Work Your Way</h3>
            <p className="text-gray-600">Set your own schedule, fees, and consultation methods. Our platform adapts to your practice needs.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-amber-600 hover:shadow-xl transition-all">
            <Award className="text-amber-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Build Your Reputation</h3>
            <p className="text-gray-600">Showcase your expertise with a professional profile and client testimonials that boost your credibility.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-xl transition-all">
            <Star className="text-red-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Premium Support</h3>
            <p className="text-gray-600">Our dedicated consultant success team helps you maximize your presence and earnings on the platform.</p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-teal-600 hover:shadow-xl transition-all">
            <Clock className="text-teal-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Efficient Case Management</h3>
            <p className="text-gray-600">Our tools help you manage consultations, documents, and client communications in one place.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Consultants Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">"Joining LegalService24 was the best decision for my practice. I've connected with clients I wouldn't have reached otherwise, and the platform handles all the administrative work."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">AS</div>
                <div className="ml-4">
                  <p className="font-semibold">Advocate Sharma</p>
                  <p className="text-sm text-blue-200">Family Law Specialist, 8+ years</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <p className="italic mb-4">"The quality of client leads is exceptional. I've grown my corporate law practice by 40% in just six months through consultations from this platform."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold">RJ</div>
                <div className="ml-4">
                  <p className="font-semibold">Rajesh Joshi</p>
                  <p className="text-sm text-blue-200">Corporate Law Expert, 12+ years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section ref={registrationFormRef} className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-16 mb-16 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
        <h2 className="text-3xl font-bold text-center">Join Our Network Today</h2>
        <p className="text-center text-gray-600 mt-2 mb-8">Complete this form to start your journey with LegalService24</p>

        {success && (
          <div className="bg-green-50 text-green-800 p-6 rounded-lg mt-4 text-center border-l-4 border-green-500 flex items-center justify-center mb-6">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            <span className="font-medium">Registration Successful! Our team will review your application shortly.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your full legal name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Specialization Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Primary Specialization</label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value, subcategory: "" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="Civil Law">Civil Law</option>
                <option value="Criminal Law">Criminal Law</option>
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Focus Area</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select Subcategory</option>
                {(formData.specialization === "Civil Law" ? civilSubcategories : criminalSubcategories).map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Years of Experience</label>
              <input
                type="number"
                placeholder="e.g., 5"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Contact Number</label>
              <input
                type="text"
                placeholder="Your professional contact number"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="text-center pt-4">
            <button 
              type="submit" 
              className={`px-8 py-4 text-white rounded-lg text-lg font-medium transition-all transform hover:scale-105 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Apply Now"}
            </button>
            <p className="text-gray-500 text-sm mt-3">Applications are typically reviewed within 24-48 hours</p>
          </div>
        </form>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800">How soon can I start accepting clients?</h3>
            <p className="mt-2 text-gray-600">After your application is approved (typically within 48 hours), you can immediately start accepting client consultations that match your expertise.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800">How do I receive payment for consultations?</h3>
            <p className="mt-2 text-gray-600">We handle all payment processing. Consultants receive direct deposits twice monthly for completed consultations, minus our platform fee.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-800">Can I set my own consultation rates?</h3>
            <p className="mt-2 text-gray-600">Yes, we provide recommended pricing based on your specialization and experience, but you have full control to set your own rates.</p>
          </div>
        </div>
      </section>

      {/* Footer/Contact Section */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Ready to transform your practice?</h3>
              <p className="text-lg mb-6">Join thousands of successful legal consultants on LegalService24</p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <button onClick={scrollToRegistration} className="inline-block px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-all text-center">Apply Now</button>
                <a href="#" className="inline-block px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all text-center">Learn More</a>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Our Consultant Support Team:</h4>
              <div className="space-y-3">
                <p className="flex items-center"><Mail className="w-5 h-5 mr-3" /> consultants@legalservice24.com</p>
                <p className="flex items-center"><Phone className="w-5 h-5 mr-3" /> +1 555-123-4567</p>
              </div>
              <p className="mt-6 text-blue-200">Available Monday-Friday, 9am-6pm IST</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 LegalService24. All rights reserved. <a href="#" className="text-blue-300 hover:underline">Terms</a> | <a href="#" className="text-blue-300 hover:underline">Privacy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BecomeConsultant;