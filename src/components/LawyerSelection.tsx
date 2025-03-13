import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { Briefcase, Phone, User, Star, ChevronLeft, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface LawyerSelectionProps {
  specialization: string;
  subcategory: string;
  onBack: () => void;
  onViewReviews: (lawyerId: number) => void;
}

interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  subcategory: string;
  experience: number;
  contact: string;
}

const LawyerSelection: React.FC<LawyerSelectionProps> = ({ specialization, subcategory, onBack }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [experienceFilter, setExperienceFilter] = useState<string>("");

  // Fetch Lawyers from Supabase
  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error } = await supabase
          .from("consultants")
          .select("*")
          .eq("specialization", specialization)
          .eq("subcategory", subcategory);

        if (error) throw error;

        if (!data || data.length === 0) {
          setError(`No lawyers found for ${subcategory}.`);
        } else {
          setLawyers(data);
          setFilteredLawyers(data); // Initialize filtered lawyers with all data
        }
      } catch (err: any) {
        console.error("Error fetching lawyers:", err.message);
        setError("Failed to load lawyer data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [specialization, subcategory]);

  // Apply Search and Filters
  useEffect(() => {
    let filtered = lawyers;

    // Apply Search
    if (searchQuery) {
      filtered = filtered.filter((lawyer) =>
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply Experience Filter
    if (experienceFilter) {
      const minExperience = parseInt(experienceFilter);
      filtered = filtered.filter((lawyer) => lawyer.experience >= minExperience);
    }

    setFilteredLawyers(filtered);
  }, [searchQuery, experienceFilter, lawyers]);

  // Handle View Reviews
  const handleViewReviews = (lawyerId: number) => {
    navigate(`/lawyer-reviews/${lawyerId}`); // Navigate to LawyerReviews with lawyerId
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-20">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-4">
        <ChevronLeft className="w-5 h-5 mr-2" /> Back
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Available Lawyers for {subcategory}
      </h2>

      {/* Search and Filters in a Single Line */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Experience Filter */}
        <select
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Experience</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
        </select>
      </div>

      {/* Display Lawyers */}
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : filteredLawyers.length === 0 ? (
        <p className="text-gray-600 text-center">No lawyers match your search or filters.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="bg-white p-6 rounded-xl shadow-lg flex items-center">
              {/* Lawyer Avatar */}
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mr-6">
                <User className="w-10 h-10 text-gray-600" />
              </div>

              {/* Lawyer Details */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{lawyer.name}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                  Specialization: {lawyer.specialization}
                </p>
                <p className="text-gray-600 flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Experience: {lawyer.experience} years
                </p>
                <p className="text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  Contact: {lawyer.contact}
                </p>

                {/* View Reviews Button */}
                <button
                  onClick={() => handleViewReviews(lawyer.id)} // Use handleViewReviews
                  className="mt-4 flex items-center text-blue-600 font-medium hover:underline"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  View Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerSelection;