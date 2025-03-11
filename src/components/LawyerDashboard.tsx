import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface Case {
  id: number;
  title: string;
  status: string;
}

const LawyerDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]); // Define expected type

  useEffect(() => {
    checkApprovalStatus();
  }, [user]);

  const checkApprovalStatus = async () => {
    const { data } = await supabase.from("consultants").select("status").eq("email", user?.primaryEmailAddress?.emailAddress);
    if (data?.[0]?.status !== "Approved") {
      navigate("/become-consultant"); // Redirect if not approved
    } else {
      fetchCases();
    }
  };

  const fetchCases = async () => {
    const { data, error } = await supabase.from("cases").select("*").eq("lawyer_email", user?.primaryEmailAddress?.emailAddress);
    if (!error && data) setCases(data as Case[]); // Type assertion
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md">
      <h2 className="text-3xl font-bold">Consultant Dashboard</h2>
      <p className="text-gray-600">Manage your cases and appointments here.</p>

      <h3 className="text-2xl font-semibold mt-6">Your Cases</h3>
      {cases.length === 0 ? (
        <p className="text-gray-500">No active cases.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {cases.map((caseItem) => (
            <li key={caseItem.id} className="py-4">
              <p className="text-lg font-medium">{caseItem.title}</p>
              <p className="text-gray-600">Status: {caseItem.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LawyerDashboard;
