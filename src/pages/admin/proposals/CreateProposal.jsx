import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import { useProposals } from "../../../contexts/ProposalContext";

export default function CreateProposal() {
  const navigate = useNavigate();
  const { createProposal } = useProposals();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    await createProposal({
      customer_id: Number(data.customerId),
      department_id: Number(data.departmentId) || null,
      description: data.description,
      budget: Number(data.budget) || null,
      deadline: data.deadline,
    });
    setLoading(false);
    alert("Proposal created successfully!");
    navigate("/admin/proposals");
  };

  const fields = [
    { name: "customerId", label: "Customer ID", type: "number", required: true },
    { name: "departmentId", label: "Department ID", type: "number" },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "budget", label: "Budget (₹)", type: "number" },
    { name: "deadline", label: "Deadline", type: "date", required: true },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Proposal</h1>
      <p className="text-gray-600 mb-6">Draft a new proposal for a customer</p>

      <CommonForm
        title="Proposal Information"
        subtitle="Fill proposal details"
        fields={fields}
        onSubmit={handleSubmit}
        submitText={loading ? "Creating..." : "Create Proposal"}
      />
    </div>
  );
}
