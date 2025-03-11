import React, { useState } from "react";
import { supabase } from "../lib/supabase"; // ✅ Ensure correct import

const civilSubcategories = [
  "Family & Matrimony Advice",
  "Banking & Corporate Matters",
  "Employment & Labor Matters",
  "Property Disputes",
  "Send a Demand Notice",
  "Draft Agreement",
  "Review Property Papers",
  "Partition Suit",
  "Consumer Disputes",
  "Intellectual Property Rights"
];

const criminalSubcategories = [
  "Cheque Bounce Cases",
  "Domestic Violence",
  "Sexual Harassment at Workplace",
  "Fraud & Cybercrime",
  "Theft & Robbery",
  "Assault & Battery",
  "Drug Offenses",
  "White-Collar Crimes",
  "Criminal Defense",
  "Bail Applications"
];

const BecomeConsultant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "Civil Law", // Default selection
    subcategory: "",
    experience: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.from("consultants").insert([
      {
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        subcategory: formData.subcategory || civilSubcategories[0], // Ensure subcategory is set
        experience: Number(formData.experience),
        contact: formData.contact,
        status: "Pending",
      },
    ]);

    if (error) {
      setError(error.message);
      console.error("Supabase Insert Error:", error.message);
    } else {
      alert("Registration successful! Awaiting admin approval.");
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
      <h2 className="text-2xl font-bold mb-4">Register as a Consultant</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border p-2" />
        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full border p-2" />

        {/* Specialization Dropdown */}
        <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full border p-2">
          <option value="Civil Law">Civil Law</option>
          <option value="Criminal Law">Criminal Law</option>
        </select>

        {/* Subcategory Dropdown - Updates Based on Specialization */}
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="w-full border p-2"
          required
        >
          <option value="">Select Subcategory</option>
          {(formData.specialization === "Civil Law" ? civilSubcategories : criminalSubcategories).map((sub, index) => (
            <option key={index} value={sub}>{sub}</option>
          ))}
        </select>

        <input name="experience" type="number" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required className="w-full border p-2" />
        <input name="contact" type="text" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full border p-2" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default BecomeConsultant;
