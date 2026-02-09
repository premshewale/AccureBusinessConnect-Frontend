import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

import { adminGetProposalByIdApi } from "../../../services/proposal/adminGetProposalByIdApi";
import { resetProposalDetails } from "../../../slices/proposal/adminGetProposalByIdSlice";
import { adminUpdateProposalApi } from "../../../services/proposal/adminUpdateProposalApi";

import { showSuccess, showError, showWarning } from "../../../utils/toast";

export default function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, proposal, error } = useSelector(
    (state) => state.adminGetProposalById
  );

  const { user, role } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  /* =======================
     FETCH PROPOSAL
  ======================= */
  useEffect(() => {
    if (id) dispatch(adminGetProposalByIdApi(id));
    return () => dispatch(resetProposalDetails());
  }, [dispatch, id]);

  /* =======================
     POPULATE FORM DATA
  ======================= */
  useEffect(() => {
    if (proposal) {
      setEditedData({
        description: proposal.description ?? "",
        budget: proposal.budget ?? "",
        deadline: proposal.deadline ?? "",
        customerId: proposal.customerId ?? "",
        departmentId: proposal.departmentId ?? "",
        ownerId: proposal.ownerId ?? user?.id,
        createdAt: proposal.createdAt ?? "",
      });
    }
  }, [proposal, user]);

  if (loading)
    return (
      <p className="mt-6 text-center text-gray-500">
        Loading proposal details...
      </p>
    );

  if (error)
    return (
      <p className="mt-6 text-center text-red-500">
        {typeof error === "string" ? error : "Failed to load proposal"}
      </p>
    );

  if (!proposal) return null;

  /* =======================
     FIELDS CONFIG
  ======================= */
  const proposalFields = [
    { name: "description", label: "Description" },
    { name: "budget", label: "Budget (₹)", type: "number" },
    { name: "deadline", label: "Deadline", type: "date" },
    { name: "customerId", label: "Customer ID", type: "number" },
    { name: "departmentId", label: "Department ID", type: "number" },
    { name: "ownerId", label: "Owner ID", type: "number", readOnly: true },
    {
      name: "createdAt",
      label: "Created At",
      readOnly: true,
      format: (val) => (val ? new Date(val).toLocaleString("en-IN") : "N/A"),
    },
  ];

  /* =======================
     FORMAT DATA
  ======================= */
  const formattedProposal = { ...editedData };
  proposalFields.forEach((field) => {
    if (field.format && formattedProposal[field.name]) {
      formattedProposal[field.name] = field.format(
        formattedProposal[field.name]
      );
    }
  });

  /* =======================
     HANDLERS
  ======================= */
  const handleEdit = () => setIsEditMode(true);

  const handleCancelEdit = () => {
    setEditedData({
      description: proposal.description,
      budget: proposal.budget,
      deadline: proposal.deadline,
      customerId: proposal.customerId,
      departmentId: proposal.departmentId,
      ownerId: proposal.ownerId,
      createdAt: proposal.createdAt,
    });
    setIsEditMode(false);
  };

const handleSave = async () => {
  if (!editedData.description?.trim()) {
    showWarning("Description is required");
    return;
  }

  if (!editedData.budget || Number(editedData.budget) <= 0) {
    showWarning("Budget must be greater than 0");
    return;
  }

  if (!editedData.deadline) {
    showWarning("Deadline is required");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (new Date(editedData.deadline) < today) {
    showWarning("Deadline must be in the future");
    return;
  }

  if (!editedData.customerId || Number(editedData.customerId) <= 0) {
    showWarning("Customer ID is required");
    return;
  }

  if (!editedData.departmentId || Number(editedData.departmentId) <= 0) {
    showWarning("Department ID is required");
    return;
  }

  const payload = {
    description: editedData.description.trim(),
    budget: Number(editedData.budget),
    deadline: editedData.deadline,
    customerId: Number(editedData.customerId),
    departmentId: Number(editedData.departmentId),
    ownerId: Number(editedData.ownerId),
  };

  try {
    await dispatch(
      adminUpdateProposalApi({ id, payload })
    ).unwrap();

    showSuccess("Proposal updated successfully 🎉");
    navigate(`/${rolePath}/proposals`);
  } catch (err) {
    showError(err?.message || "Failed to update proposal");
  }
};


  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        onClick={() => navigate(`/${rolePath}/proposals`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <CommonDetails
        title="Proposal Details"
        data={formattedProposal}
        fields={proposalFields}
        isEditMode={isEditMode}
        editedData={editedData}
        setEditedData={setEditedData}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancelEdit}
        showDelete={false}
      />
    </div>
  );
}
