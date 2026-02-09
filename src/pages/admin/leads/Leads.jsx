import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import LeadStats from "./LeadStats.jsx";
import ConvertToCustomerPopup from "./ConvertToCustomerPopup";

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

  // Calculate lead statistics
  const leadStats = React.useMemo(() => {
    const total = leads.length;
    
    // Count leads by status
    const newLeads = leads.filter(lead => lead.status === "NEW").length;
    const contacted = leads.filter(lead => lead.status === "CONTACTED").length;
    const qualified = leads.filter(lead => lead.status === "QUALIFIED").length;
    const won = leads.filter(lead => lead.status === "WON").length;
    const lost = leads.filter(lead => lead.status === "LOST").length;
    
    // Calculate conversion rate (WON / (WON + LOST)) * 100
    const conversionRate = won + lost > 0 
      ? Math.round((won / (won + lost)) * 100) 
      : 0;
    
    // Calculate estimated value (assuming each lead has an 'estimatedValue' property)
    const estimatedValue = leads.reduce((sum, lead) => 
      sum + (lead.estimatedValue || 0), 0
    );

    // Calculate new leads this month
    const thisMonthLeads = leads.filter(lead => {
      const createdDate = new Date(lead.createdAt);
      const now = new Date();
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return createdDate > oneMonthAgo;
    }).length;

    return {
      total,
      new: newLeads,
      contacted,
      qualified,
      won,
      lost,
      conversionRate,
      estimatedValue,
      thisMonth: thisMonthLeads,
      // These would typically come from backend or historical data
      totalChange: "+12%",
      newChange: "+18%",
      qualifiedChange: "+8%",
      contactedChange: "+15%",
      conversionChange: "+5%",
      valueChange: "+22%",
      wonChange: "+10%",
      lostChange: "-5%"
    };
  }, [leads]);

  // Map leads with toggle state for optimistic UI
  const mappedLeads = leads.map((lead) => ({
    ...lead,
    active: leadToggles[lead.id] === undefined ? lead.active : leadToggles[lead.id],
  }));

  // 🔹 Filtered Leads
  const filteredLeads = mappedLeads
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
      showSuccess(`${lead.name} deleted successfully`);
      dispatch(adminGetAllLeads()); // refresh list
    } catch (err) {
      showError(err || "Failed to delete lead");
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

  const handleConvertSubmit = async (payload) => {
    try {
      await dispatch(
        adminConvertLeadApi({
          leadId: payload.leadId,
          payload: {
            customerType: payload.customerType,
            industry: payload.industry,
            address: payload.address,
            website: payload.website,
          },
        }),
      ).unwrap();

      showSuccess("Lead converted to customer successfully");

      setShowConvertPopup(false);
      setSelectedLead(null);

      dispatch(adminGetAllLeads());
    } catch (err) {
      showError(err || "Failed to convert lead");
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

      showSuccess(`Lead status updated to ${newStatus}`);
      dispatch(adminGetAllLeads()); // refresh AFTER update
    } catch (err) {
      showError(err || "Failed to update status");
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
        showWarning("Lead deactivation cancelled");
        return;
      }

      try {
        await dispatch(adminDeactivateLead(id)).unwrap();
        showSuccess("Lead deactivated successfully");
      } catch (err) {
        showError(err);
        setLeadToggles((prev) => ({ ...prev, [id]: true }));
      }
    } else {
      try {
        await dispatch(adminActivateLead(id)).unwrap();
        showSuccess("Lead activated successfully");
      } catch (err) {
        showError(err);
        setLeadToggles((prev) => ({ ...prev, [id]: false }));
      }
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
          <p className="text-gray-600">
            Manage and track your sales leads
          </p>
        </div>

        <button
          onClick={() => navigate(`/${rolePath}/create-lead`)}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> New Lead
        </button>
      </div>

      {/* Statistics Cards */}
      <LeadStats stats={leadStats} />

      {/* Status Filter */}
      {activeTab === "table" && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-lg px-4 py-2 text-sm font-medium border transition-colors ${
                filter === status
                  ? "bg-cyan text-white border-cyan"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      {/* Search + Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        {/* Search - only shown in table view */}
        {activeTab === "table" && (
          <div className="relative w-full md:w-96">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
            />
          </div>
        )}

        {/* View Toggle Buttons */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Error loading leads</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Content Area */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border p-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-lg mb-2">No leads found</p>
              <p className="text-sm mb-4">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <>
              {activeTab === "kanban" && <Kanban columns={columns} />}
              {activeTab === "table" && (
                <CommonTable
                  type="leads"
                  data={filteredLeads}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onConvertToCustomer={handleConvertToCustomer}
                  onStatusToggle={handleLeadToggle}
                  onStatusChange={handleStatusChange}
                  showExport={false}
                  showActions={true}
                />
              )}
            </>
          )}
        </div>
      )}

      {/* Convert to Customer Popup */}
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
  );
}