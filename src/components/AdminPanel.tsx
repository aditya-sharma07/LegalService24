import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Loader2, User } from "lucide-react"; // ✅ Icons for better UI

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
        .eq("status", "Pending"); // ✅ Fetch only Pending consultants
  
      if (error) {
        toast.error("Failed to load pending consultants.");
      } else {
        setPendingConsultants(data);
      }
  
      setLoading(false);
    };
  
    fetchPendingConsultants();
  
    // ✅ Real-time listener for consultant status changes
    const subscription = supabase
      .channel("consultants")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "consultants" },
        (payload) => {
          if (payload.new.status === "Approved") {
            fetchPendingConsultants(); // ✅ Refresh the list after approval
          }
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(subscription); // Cleanup on component unmount
    };
  }, []);
  

  const handleApprove = async (id: number) => {
    const { error } = await supabase
      .from("consultants")
      .update({ status: "Approved" }) // ✅ Set status to 'Approved'
      .eq("id", id);

      if (error) {
        toast.error("Failed to approve consultant.");
      } else {
        toast.success("Consultant approved!");
        setPendingConsultants(pendingConsultants.filter(c => c.id !== id));
      }
    };

  const handleReject = async (id: number) => {
    const { error } = await supabase
      .from("consultants")
      .update({ status: "Rejected" })
      .eq("id", id);

    if (error) {
      toast.error("Failed to reject consultant.");
    } else {
      toast.success("Consultant rejected!");
      setPendingConsultants(pendingConsultants.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Admin Panel Header */}
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-3xl font-bold">Admin Panel</h2>
        <p className="text-gray-200">Manage pending consultant approvals</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Pending Consultants</h3>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
        ) : pendingConsultants.length === 0 ? (
          <p className="text-gray-500 text-center">No pending consultants.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Specialization</th>
                  <th className="border p-3">Experience</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingConsultants.map((consultant) => (
                  <tr key={consultant.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 flex items-center">
                      <User className="w-5 h-5 text-gray-500 mr-2" />
                      {consultant.name}
                    </td>
                    <td className="p-3">{consultant.email}</td>
                    <td className="p-3">{consultant.specialization}</td>
                    <td className="p-3">{consultant.experience} years</td>
                    <td className="p-3 flex space-x-3">
                      <button
                        onClick={() => handleApprove(consultant.id)}
                        className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 flex items-center"
                      >
                        <CheckCircle className="w-5 h-5 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(consultant.id)}
                        className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 flex items-center"
                      >
                        <XCircle className="w-5 h-5 mr-1" />
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
