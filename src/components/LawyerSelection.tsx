import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

/* ✅ Define Expected Props */
interface LawyerSelectionProps {
  specialization: string | null; // Allow null to prevent errors
  subcategory: string | null; // Allow null to prevent errors
  onBack: () => void;
  onViewReviews: (lawyerId: number) => void;
}

/* ✅ Define Lawyer Type */
interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  subcategory: string;
  experience: number;
  contact: string;
}

/* ✅ Apply Type to useState */
const LawyerSelection: React.FC<LawyerSelectionProps> = ({ specialization, subcategory, onBack, onViewReviews }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔹 Fetch Lawyers from Supabase */
  useEffect(() => {
    if (!specialization || !subcategory) {
      toast.error("Invalid selection. Please choose a specialization and subcategory.");
      onBack();
      return;
    }

    const fetchLawyers = async () => {
      setLoading(true);
      
      /* 🔹 Fetch Only Approved Lawyers Matching Specialization & Subcategory */
      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .eq("status", "Approved")
        .eq("specialization", specialization)
        .eq("subcategory", subcategory);

      if (error) {
        toast.error("Failed to load lawyer data.");
      } else {
        setLawyers(data);
      }

      setLoading(false);
    };

    fetchLawyers();
  }, [specialization, subcategory]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      
      {/* 🔹 Back Button (Ensures it is Visible) */}
      <button onClick={onBack} className="text-blue-600 hover:underline mb-4">
        ← Back
      </button>

      {/* 🔹 Display Lawyers */}
      <h2 className="text-2xl font-bold mb-4">Available Lawyers for {subcategory}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : lawyers.length === 0 ? (
        <p>No approved lawyers found for {subcategory}.</p>
      ) : (
        <ul>
          {lawyers.map((lawyer) => (
            <li key={lawyer.id} className="p-4 border-b">
              <h3 className="font-bold">{lawyer.name}</h3>
              <p>Specialization: {lawyer.specialization}</p>
              <p>Subcategory: {lawyer.subcategory}</p>
              <p>Experience: {lawyer.experience} years</p>
              <p>Contact: {lawyer.contact}</p>
              <button 
                onClick={() => onViewReviews(lawyer.id)} 
                className="text-blue-600 hover:underline"
              >
                View Reviews
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LawyerSelection;
