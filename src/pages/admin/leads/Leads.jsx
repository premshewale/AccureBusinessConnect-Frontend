import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";

import { adminGetAllLeads } from "../../../services/lead/adminGetAllLeadsApi.js";
import { adminDeleteLeadApi } from "../../../slices/lead/adminDeleteLeadSlice.js";
import { resetDeleteLeadState } from "../../../slices/lead/adminDeleteLeadSlice.js";

export default function Leads() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("kanban");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, leads = [], error } = useSelector(
    (state) => state.adminGetAllLeads
  );

  useEffect(() => {
    dispatch(adminGetAllLeads());
  }, [dispatch]);

  // 🔹 Filtered Leads
  const filteredLeads = leads
    .filter((lead) => filter === "All" || lead.status === filter)
    .filter((lead) =>
      [lead.name, lead.email, lead.phone].some(
        (field) =>
          field && field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const statuses = ["All", "NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"];

  // 🔹 Kanban columns
  const columns = statuses
    .filter((status) => status !== "All")
    .map((status) => ({
      title: status,
      cards: leads.filter((lead) => lead.status === status),
    }));

  const handleEdit = (lead) => {
    navigate(`/admin/lead-details/${lead.id}`);
  };

  // 🔹 Delete lead handler
  const handleDelete = async (lead) => {
    if (!window.confirm(`Are you sure you want to delete ${lead.name}?`))
      return;

    try {
      await dispatch(adminDeleteLeadApi(lead.id)).unwrap();
      alert(`${lead.name} deleted successfully`);
      dispatch(adminGetAllLeads()); // refresh list
    } catch (err) {
      alert(err || "Failed to delete lead");
    } finally {
      dispatch(resetDeleteLeadState());
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Leads</h3>
          <p className="text-sm text-fontgrey">
            Manage And Track Your Sales Leads
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/create-lead")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + New Lead
        </button>
      </div>

      {/* Status Filter */}
      {activeTab === "table" && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-[8px] px-4 py-1 text-sm font-medium border
                w-[123px] h-[27px]
                ${
                  filter === status
                    ? "bg-cyan text-white"
                    : "bg-white text-[#5f5f5f] hover:bg-cyan hover:text-white"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      {/* Search + Tabs */}
      <div className="flex">
        {activeTab === "table" && (
          <div className="w-full flex justify-start mt-4 mb-2">
            <div className="relative w-[430px]">
              <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-[30px] rounded-[8px] border pl-10 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        )}

        <div className="w-full flex justify-end mt-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border
                ${
                  activeTab === "kanban"
                    ? "bg-white border-cyan text-cyan shadow"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <RxDashboard size={14} />
              Kanban
            </button>

            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border
                ${
                  activeTab === "table"
                    ? "bg-white border-cyan text-cyan shadow"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <RxTable size={14} />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* States */}
      {loading && (
        <p className="mt-4 text-sm text-gray-500">Loading leads...</p>
      )}
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {/* Content */}
      <div className="mt-6">
        {activeTab === "kanban" && <Kanban columns={columns} />}

        {activeTab === "table" && (
          <CommonTable
            type="leads"
            data={filteredLeads}
            onEdit={handleEdit}
            onDelete={handleDelete} // ✅ Pass delete handler
            onView={handleEdit}
            onRowClick={(lead) => navigate(`/admin/lead-details/${lead.id}`)}
            showActions={true}
          />
        )}
      </div>
    </>
  );
}
