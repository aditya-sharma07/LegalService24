import { useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

const BecomeConsultant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Civil Law",
    subcategory: "",
    experience: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false); // ✅ Prevent multiple submissions
  const [success, setSuccess] = useState(false); // ✅ Show success message

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
    setLoading(true); // ✅ Disable button to prevent duplicate submissions
    setSuccess(false); // ✅ Reset success message

    const { error } = await supabase.from("consultants").insert([formData]);

    if (error) {
      toast.error("Error registering. Try again!");
    } else {
      toast.success("Successfully registered as a consultant!");
      setSuccess(true); // ✅ Show success message
      setFormData({
        name: "",
        email: "",
        specialization: "Civil Law",
        subcategory: "",
        experience: "",
        contact: "",
      });
    }
    setLoading(false); // ✅ Re-enable the button
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Consultant</h2>

      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4 text-center">
          ✅ Registration Successful! You can now register another consultant.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        
        {/* Specialization Dropdown */}
        <select
          value={formData.specialization}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value, subcategory: "" })}
          className="w-full p-2 border rounded"
        >
          <option value="Civil Law">Civil Law</option>
          <option value="Criminal Law">Criminal Law</option>
        </select>

        {/* Subcategory Dropdown */}
        <select
          value={formData.subcategory}
          onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <button 
          type="submit" 
          className={`w-full text-white p-2 rounded transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // ✅ Disable button when loading
        >
          {loading ? "Registering..." : "Register as Consultant"}
        </button>
      </form>
    </div>
  );
};

export default BecomeConsultant;
