import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

import { adminGetProposalByIdApi } from "../../../services/proposal/adminGetProposalByIdApi";
import { resetProposalDetails } from "../../../slices/proposal/adminGetProposalByIdSlice";
import { adminUpdateProposalApi } from "../../../services/proposal/adminUpdateProposalApi";

/* =======================
   SAFE SELECT OPTIONS
======================= */
const PROPOSAL_STATUS_OPTIONS = [
  "DRAFT",
  "SENT",
  "APPROVED",
  "REJECTED",
];

export default function ProposalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, proposal, error } = useSelector(
    (state) => state.adminGetProposalById
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  /* =======================
     FETCH PROPOSAL
  ======================= */
  useEffect(() => {
    if (id) {
      dispatch(adminGetProposalByIdApi(id));
    }

    return () => {
      dispatch(resetProposalDetails());
    };
  }, [dispatch, id]);

  /* =======================
     POPULATE EDIT DATA
  ======================= */
  useEffect(() => {
    if (proposal) {
      setEditedData({
        id: proposal.id ?? "",
        description: proposal.description ?? "",
        budget: proposal.budget ?? "",
        deadline: proposal.deadline ?? "",
        status: proposal.status ?? "",
        customerName: proposal.customerName ?? "",
        departmentName: proposal.departmentName ?? "",
        ownerName: proposal.ownerName ?? "",
        createdAt: proposal.createdAt ?? "",
      });
    }
  }, [proposal]);

  /* =======================
     STATES
  ======================= */
  if (loading) {
    return (
      <p className="mt-6 text-center text-gray-500">
        Loading proposal details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="mt-6 text-center text-red-500">
        {typeof error === "string" ? error : "Failed to load proposal"}
      </p>
    );
  }

  if (!proposal) return null;

  /* =======================
     FIELDS CONFIG
  ======================= */
  const proposalFields = [
    { name: "id", label: "Proposal ID", readOnly: true },
    { name: "description", label: "Description" },
    {
      name: "budget",
      label: "Budget (₹)",
      type: "number",
    },
    {
      name: "deadline",
      label: "Deadline",
      type: "date",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: PROPOSAL_STATUS_OPTIONS,
    },
    {
      name: "customerName",
      label: "Customer",
      readOnly: true,
    },
    {
      name: "departmentName",
      label: "Department",
      readOnly: true,
    },
    {
      name: "ownerName",
      label: "Owner",
      readOnly: true,
    },
    {
      name: "createdAt",
      label: "Created At",
      readOnly: true,
      format: (val) =>
        val ? new Date(val).toLocaleString("en-IN") : "N/A",
    },
  ];

  /* =======================
     FORMAT DATA (SAFE)
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
    setEditedData({ ...formattedProposal });
    setIsEditMode(false);
  };

  const handleSave = async () => {
    try {
      await dispatch(
        adminUpdateProposalApi({
          id,
          payload: {
            description: editedData.description,
            budget: Number(editedData.budget),
            deadline: editedData.deadline,
            status: editedData.status,
          },
        })
      ).unwrap();

      alert("Proposal updated successfully");
      dispatch(adminGetProposalByIdApi(id));
      setIsEditMode(false);
    } catch (err) {
      alert(
        typeof err === "string"
          ? err
          : "Failed to update proposal"
      );
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
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
