import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { adminGetAllProposals } from "../../../services/proposal/adminGetAllProposalsApi";
import { adminDeleteProposalApi } from "../../../services/proposal/adminDeleteProposalApi";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";

import ProposalStats from "./ProposalStats.jsx";
import ProposalFilter from "./ProposalFilter.jsx";

export default function Proposals() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { proposals = [], loading } = useSelector(
    (state) => state.adminGetAllProposals,
  );
  const { role } = useSelector((state) => state.auth.user);
  const rolePath = role?.toLowerCase() || "admin"; // fallback to admin

  useEffect(() => {
    dispatch(adminGetAllProposals());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");

  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    departmentId: "All",
    budgetRange: "All",
    deadline: "All",
  });

  const handleRefresh = () => window.location.reload();

  const exportData = proposals.map((p) => ({
    ID: p.id,
    Customer: p.customer_id,
    Department: p.department_id,
    Description: p.description,
    Budget: p.budget,
    Status: p.status,
    Deadline: p.deadline,
    Created: p.createdAt,
  }));

  const filteredProposals = proposals.filter((p) => {
    if (
      searchQuery &&
      !p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (filter !== "All" && p.status?.toUpperCase() !== filter) {
      return false;
    }

    if (
      filterOptions.status !== "All" &&
      p.status?.toUpperCase() !== filterOptions.status
    ) {
      return false;
    }

    if (
      filterOptions.departmentId !== "All" &&
      String(p.department_id) !== filterOptions.departmentId
    ) {
      return false;
    }

    if (filterOptions.budgetRange !== "All") {
      const budget = p.budget || 0;

      if (
        (filterOptions.budgetRange === "Below 50k" && budget >= 50000) ||
        (filterOptions.budgetRange === "50k - 1L" &&
          (budget < 50000 || budget > 100000)) ||
        (filterOptions.budgetRange === "1L - 5L" &&
          (budget < 100000 || budget > 500000)) ||
        (filterOptions.budgetRange === "Above 5L" && budget <= 500000)
      ) {
        return false;
      }
    }

    return true;
  });
  const getProposalStats = () => {
    const total = proposals.length;

    const pending = proposals.filter(
      (p) => p.status?.toUpperCase() === "PENDING",
    ).length;

    const sent = proposals.filter(
      (p) => p.status?.toUpperCase() === "SENT",
    ).length;

    const accepted = proposals.filter(
      (p) => p.status?.toUpperCase() === "ACCEPTED",
    ).length;

    const rejected = proposals.filter(
      (p) => p.status?.toUpperCase() === "REJECTED",
    ).length;

    return [
      { label: "Total", value: total },
      { label: "Pending", value: pending },
      { label: "Sent", value: sent },
      { label: "Accepted", value: accepted },
      { label: "Rejected", value: rejected },
    ];
  };

  const stats = getProposalStats();

  const kanbanColumns = [
    {
      title: "Pending",
      cards: filteredProposals
        .filter((p) => p.status?.toUpperCase() === "PENDING")
        .map((p) => ({
          id: p.id,
          name: `#${p.id} Proposal`,
          service: `Customer ${p.customer_id}`,
          status: "Pending",
        })),
    },
    {
      title: "Sent",
      cards: filteredProposals
        .filter((p) => p.status?.toUpperCase() === "SENT")
        .map((p) => ({
          id: p.id,
          name: `#${p.id} Proposal`,
          service: `Customer ${p.customer_id}`,
          status: "Sent",
        })),
    },
    {
      title: "Accepted",
      cards: filteredProposals
        .filter((p) => p.status?.toUpperCase() === "ACCEPTED")
        .map((p) => ({
          id: p.id,
          name: `#${p.id} Proposal`,
          service: `Customer ${p.customer_id}`,
          status: "Accepted",
        })),
    },
    {
      title: "Rejected",
      cards: filteredProposals
        .filter((p) => p.status?.toUpperCase() === "REJECTED")
        .map((p) => ({
          id: p.id,
          name: `#${p.id} Proposal`,
          service: `Customer ${p.customer_id}`,
          status: "Rejected",
        })),
    },
  ];

  const statuses = ["All", "PENDING", "SENT", "ACCEPTED", "REJECTED"];
  // Edit proposal
  const handleEdit = (proposal) => {
    const id = proposal?.id ?? proposal;
    navigate(`/${rolePath}/proposals/${id}`); // ✅ dynamic
  };

  const handleDelete = async (proposal) => {
    const id = proposal?.id ?? proposal;

    if (window.confirm(`Delete Proposal #${id}?`)) {
      dispatch(adminDeleteProposalApi(id));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Proposals</h1>
          <p className="text-gray-600">
            Manage all customer proposals in one place
          </p>
        </div>
        <button
          onClick={() => navigate(`/${rolePath}/create-proposal`)} // ✅ dynamic
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + Create Proposal
        </button>
      </div>

      <ProposalStats stats={stats} />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 p-4 bg-white rounded-lg border">
        <div className="flex gap-4">
          <CommonExportButton data={exportData} fileName="proposals" />
          <button onClick={handleRefresh} className="p-2 border rounded-lg">
            <MdOutlineRefresh />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 h-10 rounded-lg border pl-10 pr-3 text-sm focus:border-cyan"
            />
          </div>

          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-lg border flex gap-2 ${
              showFilter ? "bg-cyan text-white border-cyan" : "border-gray-300"
            }`}
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      </div>

      {showFilter && (
        <ProposalFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm border rounded-lg ${
              filter === s
                ? "bg-cyan text-white border-cyan"
                : "border-gray-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredProposals.length} of {proposals.length} proposals
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>

          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "border-gray-300"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-4">
        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-2 border-cyan border-t-transparent rounded-full"></div>
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="text-center text-gray-500 p-8">
            No proposals found
          </div>
        ) : (
          <>
            {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
            {activeTab === "table" && (
              <CommonTable
                type="proposals"
                data={filteredProposals}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
