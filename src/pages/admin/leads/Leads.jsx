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
import { adminUpdateLeadStatusApi } from "../../../services/lead/adminUpdateLeadStatusApi.js";
import { resetUpdateLeadStatusState } from "../../../slices/lead/adminUpdateLeadStatusSlice.js";
import { adminConvertLeadApi } from "../../../services/lead/adminConvertLeadApi";
import { resetConvertLeadState } from "../../../slices/lead/adminConvertLeadSlice";

import {
  adminActivateLead,
  adminDeactivateLead,
} from "../../../services/lead/adminToggleLeadStatusApi";

import ConvertToCustomerPopup from "./ConvertToCustomerPopup";
import { showSuccess, showError, showWarning } from "../../../utils/toast.js";

export default function Leads() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("kanban");
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showConvertPopup, setShowConvertPopup] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToggles, setLeadToggles] = useState({});

  const {
    loading,
    leads = [],
    error,
  } = useSelector((state) => state.adminGetAllLeads);
  const { role } = useSelector((state) => state.auth);

  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  useEffect(() => {
    dispatch(adminGetAllLeads());
  }, [dispatch]);
  useEffect(() => {
    setLeadToggles((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      const initial = {};
      leads.forEach((lead) => {
        initial[lead.id] = lead.active === true;
      });
      return initial;
    });
  }, [leads]);

  // 🔹 Filtered Leads
  const filteredLeads = leads
    .filter((lead) => filter === "All" || lead.status === filter)
    .filter((lead) =>
      [lead.name, lead.email, lead.phone].some(
        (field) =>
          field && field.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

  const statuses = ["All", "NEW", "CONTACTED", "QUALIFIED", "LOST", "WON"];

  // 🔹 Kanban columns (use filteredLeads to respect search/filter)
  const columns = statuses
    .filter((status) => status !== "All")
    .map((status) => ({
      title: status,
      cards: filteredLeads.filter((lead) => lead.status === status),
    }));

  const handleEdit = (id) => {
    navigate(`/${rolePath}/lead-details/${id}`);
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
  const handleConvertToCustomer = (lead) => {
    if (!["QUALIFIED", "WON"].includes(lead.status)) {
      showWarning("Only QUALIFIED or WON leads can be converted");
      return;
    }

    setSelectedLead(lead);
    setShowConvertPopup(true);
  };
const handleView = (lead) => {
  const id = lead?.id || lead;
  if (!id) return;
  navigate(`/${rolePath}/leads/${id}/view`);
};

const handleConvertSubmit = async (data) => {
  try {
    await dispatch(adminConvertLeadApi(data)).unwrap();

    showSuccess("Lead converted to customer successfully");
    setShowConvertPopup(false);
    setSelectedLead(null);
    dispatch(adminGetAllLeads());
  } catch (err) {
    showError(err);
  } finally {
    dispatch(resetConvertLeadState());
  }
};


  // 🔹 Update lead status handler
  const handleStatusChange = async (lead, newStatus) => {
    try {
      await dispatch(
        adminUpdateLeadStatusApi({ id: lead.id, status: newStatus }),
      ).unwrap();

      dispatch(adminGetAllLeads()); // refresh AFTER update
    } catch (err) {
      alert(err || "Failed to update status");
    } finally {
      dispatch(resetUpdateLeadStatusState());
    }
  };
  const handleLeadToggle = async (id, isActive) => {
    // Optimistic update
    setLeadToggles((prev) => ({
      ...prev,
      [id]: isActive,
    }));

    if (!isActive) {
      const confirm = window.confirm(
        "Are you sure you want to deactivate this lead?",
      );
      if (!confirm) {
        setLeadToggles((prev) => ({ ...prev, [id]: true }));
        return;
      }

      try {
        await dispatch(adminDeactivateLead(id)).unwrap();
        showSuccess("Lead deactivated");
      } catch (err) {
        showError(err);
        setLeadToggles((prev) => ({ ...prev, [id]: true }));
      }
    } else {
      try {
        await dispatch(adminActivateLead(id)).unwrap();
        showSuccess("Lead activated");
      } catch (err) {
        showError(err);
        setLeadToggles((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  const mappedLeads = filteredLeads.map((lead) => ({
    ...lead,
    active:
      leadToggles[lead.id] === undefined ? lead.active : leadToggles[lead.id],
  }));

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
          onClick={() => navigate(`/${rolePath}/create-lead`)}
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
            onView={handleView}
            onEdit={handleEdit}
            onConvertToCustomer={handleConvertToCustomer}
            showActions={true}
            onStatusToggle={handleLeadToggle}
            onStatusChange={handleStatusChange}
          />
        )}
        <ConvertToCustomerPopup
          open={showConvertPopup}
          onClose={() => {
            setShowConvertPopup(false);
            setSelectedLead(null);
          }}
          leadId={selectedLead?.id}
          onSubmit={handleConvertSubmit}
        />
      </div>
    </>
  );
}
