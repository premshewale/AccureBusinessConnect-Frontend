import React from "react";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateProposalApi } from "../../../services/proposal/adminCreateProposalApi";

export default function CreateProposal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.adminCreateProposal);

  const handleSubmit = async (data) => {
    const payload = {
      customerId: Number(data.customerId),
      departmentId: Number(data.departmentId) || null,
      description: data.description,
      budget: Number(data.budget) || null,
      deadline: data.deadline,
      ownerId: user?.id,
    };

    try {
      await dispatch(adminCreateProposalApi(payload)).unwrap();
      alert("Proposal created successfully!");
      navigate("/admin/proposals");
    } catch (error) {
      console.error("Create proposal error:", error);
      alert(error || "Failed to create proposal");
    }
  };

  const fields = [
    {
      name: "customerId",
      label: "Customer ID",
      type: "number",
      required: true,
    },
    { name: "departmentId", label: "Department ID", type: "number" },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    { name: "budget", label: "Budget (₹)", type: "number" },
    { name: "deadline", label: "Deadline", type: "date", required: true },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Create Proposal
      </h1>
      <p className="text-gray-600 mb-6">
        Draft a new proposal for a customer
      </p>

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
