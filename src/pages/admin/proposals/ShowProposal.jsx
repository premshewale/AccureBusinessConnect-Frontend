import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails";
import { adminGetProposalByIdApi } from "../../../services/proposal/adminGetProposalByIdApi";
import { resetProposalDetails } from "../../../slices/proposal/adminGetProposalByIdSlice";

export default function ShowProposal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { proposal, loading, error } = useSelector(
    (state) => state.adminGetProposalById
  );

  const { role } = useSelector((state) => state.auth);
  const rolePath = role?.toLowerCase() || "admin";

  /* =======================
     FETCH PROPOSAL
  ======================= */
  useEffect(() => {
    if (id) dispatch(adminGetProposalByIdApi(id));
    return () => dispatch(resetProposalDetails());
  }, [dispatch, id]);

  /* =======================
     UI STATES
  ======================= */
  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">
        Loading proposal details...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-10">
        {typeof error === "string"
          ? error
          : "Failed to load proposal details"}
      </p>
    );
  }

  if (!proposal) {
    return (
      <p className="text-center text-red-500 py-10">
        No proposal details found
      </p>
    );
  }

  /* =======================
     FORMAT DATA (READ ONLY)
  ======================= */
  const formattedProposal = {
    ...proposal,
    budget: proposal.budget
      ? `₹ ${Number(proposal.budget).toLocaleString("en-IN")}`
      : "-",
    deadline: proposal.deadline
      ? new Date(proposal.deadline).toDateString()
      : "-",
    createdAt: proposal.createdAt
      ? new Date(proposal.createdAt).toLocaleString("en-IN")
      : "-",
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto">
      <button
        onClick={() => navigate(`/${rolePath}/proposals`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <ShowDetails
        title="Proposal Details"
        data={formattedProposal}
      />
    </div>
  );
}
