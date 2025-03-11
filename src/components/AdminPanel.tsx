import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Ensure correct import
import toast from "react-hot-toast";

interface Consultant {
  id: number;
  name: string;
  email: string;
  specialization: string;
  subcategory: string;
  experience: number;
  contact: string;
  status: string;
}

const AdminPanel = () => {
  const [pendingConsultants, setPendingConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingConsultants = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("consultants")
        .select("*")
        .eq("status", "Pending");

      if (error) {
        toast.error("Failed to load pending consultants.");
      } else {
        setPendingConsultants(data);
      }

      setLoading(false);
    };

    fetchPendingConsultants();
  }, []);

  const handleApprove = async (id: number) => {
    const { error } = await supabase
      .from("consultants")
      .update({ status: "Approved" }) // Change status to 'Approved'
      .eq("id", id);

    if (error) {
      toast.error("Failed to approve consultant.");
    } else {
      toast.success("Consultant approved!");
      setPendingConsultants(pendingConsultants.filter(c => c.id !== id)); // Remove approved consultant from list
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Pending Consultants</h2>

      {loading ? <p>Loading...</p> : pendingConsultants.length === 0 ? (
        <p>No pending consultants.</p>
      ) : (
        <ul>
          {pendingConsultants.map((consultant) => (
            <li key={consultant.id} className="p-4 border-b">
              <h3 className="font-bold">{consultant.name}</h3>
              <p>Email: {consultant.email}</p>
              <p>Specialization: {consultant.specialization}</p>
              <p>Experience: {consultant.experience} years</p>
              <button
                onClick={() => handleApprove(consultant.id)}
                className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
