import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Briefcase, Phone, User, Star, ChevronLeft, Eye, Search, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
          .eq("subcategory", subcategory)
          .eq("status", "Approved");

        if (error) throw error;

        if (!data || data.length === 0) {
          setError(`No lawyers found for ${subcategory}.`);
        } else {
          setLawyers(data);
          setFilteredLawyers(data);
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
    navigate(`/lawyer-reviews/${lawyerId}`);
  };

  // Handle Booking Consultation
  const handleBookConsultation = (lawyerId: number) => {
    navigate(`/book-consultation/${lawyerId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-20">
      {/* Back Button */}
      <button onClick={onBack} className="flex items-center text-blue-600 hover:underline mb-6">
        <ChevronLeft className="w-5 h-5 mr-2" /> Back
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Available Lawyers for {subcategory}
      </h2>

      {/* Search and Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
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
        <div className="space-y-6">
          {filteredLawyers.map((lawyer) => (
            <div key={lawyer.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:items-start hover:shadow-xl transition-shadow">
              {/* Lawyer Avatar */}
              <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center mr-6 mb-4 md:mb-0">
                <User className="w-14 h-14 text-gray-600" />
              </div>

              {/* Lawyer Details */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800">{lawyer.name}</h3>
                <p className="text-gray-600 flex items-center mt-2">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  {lawyer.specialization}
                </p>
                <p className="text-gray-600 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  {lawyer.experience} years experience
                </p>
                <p className="text-gray-600 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-green-500" />
                  {lawyer.contact}
                </p>

                {/* Buttons Section */}
                <div className="mt-4 flex space-x-3">
                  {/* View Reviews Button */}
                  <button
                    onClick={() => handleViewReviews(lawyer.id)}
                    className="flex items-center text-white bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Reviews
                  </button>

                  {/* Book Consultation Button */}
                  <button
                    onClick={() => handleBookConsultation(lawyer.id)}
                    className="flex items-center text-white bg-gradient-to-r from-green-500 to-green-700 px-5 py-2 rounded-lg font-medium hover:scale-105 transition transform shadow-lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LawyerSelection;
