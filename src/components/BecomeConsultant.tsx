import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { Briefcase, CheckCircle, Shield, UserPlus, Phone, Mail } from "lucide-react"; 

const BecomeConsultant = () => {
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Join LegalService24 as a Consultant</h1>
        <p className="text-lg mt-3 max-w-2xl mx-auto">
          Become part of an elite network of legal professionals and connect with clients easily.
        </p>
      </header>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Why Join Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <Shield className="text-blue-600 mx-auto w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4">Secure & Trusted</h3>
            <p className="text-gray-600 mt-2">We ensure a safe and verified client-lawyer connection.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <Briefcase className="text-green-600 mx-auto w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4">Expand Your Client Base</h3>
            <p className="text-gray-600 mt-2">Gain access to clients looking for expert legal services.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg text-center">
            <UserPlus className="text-red-600 mx-auto w-12 h-12" />
            <h3 className="text-xl font-semibold mt-4">Flexible Work</h3>
            <p className="text-gray-600 mt-2">Work on your own terms and manage your schedule efficiently.</p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-center">Register as a Consultant</h2>

        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-lg mt-4 text-center">
            ✅ Registration Successful! Awaiting admin approval.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          
          {/* Specialization Dropdown */}
          <select
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value, subcategory: "" })}
            className="w-full p-3 border rounded"
          >
            <option value="Civil Law">Civil Law</option>
            <option value="Criminal Law">Criminal Law</option>
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            className="w-full p-3 border rounded"
            required
          >
            <option value="">Select Subcategory</option>
            {(formData.specialization === "Civil Law" ? civilSubcategories : criminalSubcategories).map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Years of Experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full p-3 border rounded"
            required
          />

          <button 
            type="submit" 
            className={`w-full text-white p-3 rounded transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Consultant"}
          </button>
        </form>
      </section>

      {/* Contact Section */}
      <footer className="bg-blue-900 text-white text-center py-6 mt-10">
        <p className="text-lg">Need Help? Contact Us:</p>
        <div className="flex justify-center space-x-6 mt-2">
          <p><Mail className="inline-block w-5 h-5 mr-2" /> support@legalservice24.com</p>
          <p><Phone className="inline-block w-5 h-5 mr-2" /> +1 555-123-4567</p>
        </div>
      </footer>
    </div>
  );
};

export default BecomeConsultant;
