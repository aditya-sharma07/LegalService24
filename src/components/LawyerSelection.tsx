import { useState, useEffect, useCallback } from "react";
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

/* ✅ Lawyer Selection Component */
const LawyerSelection: React.FC<LawyerSelectionProps> = ({ specialization, subcategory, onBack, onViewReviews }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ✅ Fetch Lawyers from Supabase */
  const fetchLawyers = useCallback(async () => {
    if (!specialization || !subcategory) {
      setError("Invalid selection. Please choose a specialization and subcategory.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .eq("status", "Approved")
        .eq("specialization", specialization)
        .eq("subcategory", subcategory);

      if (error) throw error;

      if (!data || data.length === 0) {
        setError(`No approved lawyers found for ${subcategory}.`);
      } else {
        setLawyers(data);
      }
    } catch (err: any) {
      console.error("Error fetching lawyers:", err.message);
      setError("Failed to load lawyer data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [specialization, subcategory]);

  useEffect(() => {
    fetchLawyers();
  }, [fetchLawyers]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      {/* 🔹 Back Button */}
      <button onClick={onBack} className="text-blue-600 hover:underline mb-4">
        ← Back
      </button>

      {/* 🔹 Page Title */}
      <h2 className="text-2xl font-bold mb-4">Available Lawyers for {subcategory || "Selected Category"}</h2>

      {/* 🔹 Handle Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="ml-2 text-gray-600">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : lawyers.length === 0 ? (
        <p className="text-gray-600">No approved lawyers found for {subcategory}.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {lawyers.map((lawyer) => (
            <li key={lawyer.id} className="p-4 border-b">
              <h3 className="font-bold text-lg">{lawyer.name}</h3>
              <p className="text-gray-700"><strong>Specialization:</strong> {lawyer.specialization}</p>
              <p className="text-gray-700"><strong>Subcategory:</strong> {lawyer.subcategory}</p>
              <p className="text-gray-700"><strong>Experience:</strong> {lawyer.experience} years</p>
              <p className="text-gray-700"><strong>Contact:</strong> {lawyer.contact}</p>
              <button 
                onClick={() => onViewReviews(lawyer.id)} 
                className="text-blue-600 hover:underline mt-2"
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
