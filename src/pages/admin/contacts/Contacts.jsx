import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import ContactStats from "./ContactStats.jsx";

import { adminGetContacts } from "../../../services/contact/adminGetContactsApi";
import {
  adminActivateContact,
  adminDeactivateContact,
} from "../../../services/contact/adminToggleContactStatusApi.js";

import { showSuccess, showError, showInfo } from "../../../utils/toast";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactToggles, setContactToggles] = useState({});

  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerId } = useParams();

  const {
    contacts = [],
    loading,
    error,
  } = useSelector((state) => state.adminGetContacts);

  // Fetch contacts
  useEffect(() => {
    const id = Number(customerId);
    if (customerId && !isNaN(id)) {
      dispatch(adminGetContacts(id));
    } else {
      console.error("Invalid customerId in route:", customerId);
    }
  }, [dispatch, customerId]);

  // Initialize toggle states
  useEffect(() => {
    if (contacts.length > 0 && Object.keys(contactToggles).length === 0) {
      const initial = {};
      contacts.forEach((c) => {
        initial[c.id] = c.isGoogleSynced;
      });
      setContactToggles(initial);
    }
  }, [contacts, contactToggles]);

  // Calculate contact statistics
  const contactStats = React.useMemo(() => {
    const total = contacts.length;
    const active = contacts.filter(c => c.status === "ACTIVE" || c.active === true).length;
    const inactive = contacts.filter(c => c.status === "INACTIVE" || c.active === false).length;
    const primary = contacts.filter(c => c.primary === true || c.is_primary === true).length;
    
    const withEmail = contacts.filter(c => c.email && c.email.trim() !== "").length;
    const withPhone = contacts.filter(c => c.phone && c.phone.trim() !== "").length;
    
    // Count unique roles
    const uniqueRoles = new Set(contacts.map(c => c.role).filter(Boolean)).size;
    
    // Count unique locations (based on city/address)
    const uniqueLocations = new Set(
      contacts
        .map(c => c.city || c.address)
        .filter(Boolean)
        .map(loc => loc.toLowerCase())
    ).size;

    return {
      total,
      active,
      inactive,
      primary,
      withEmail,
      withPhone,
      uniqueRoles,
      locations: uniqueLocations,
      // These would typically come from backend or historical data
      totalChange: "+12%",
      activeChange: "+8%",
      inactiveChange: "-3%",
      primaryChange: "+5%",
      emailChange: "+15%",
      phoneChange: "+10%",
      rolesChange: "+7%",
      locationsChange: "+6%",
    };
  }, [contacts]);

  const statuses = ["All", "Active", "Inactive", "New", "Contacted", "Lost"];

  // Table data with toggle state applied
  const tableData = contacts.map((c) => ({
    id: c.id,
    firstname: c.firstName,
    lastname: c.lastName,
    email: c.email,
    phone: c.phone,
    role: c.role || "-",
    customerName: c.customerName,
    is_primary: c.primary,
    status: c.status || "ACTIVE",
    toggle:
      contactToggles[c.id] === undefined
        ? c.primary
        : contactToggles[c.id],
    actions: "actions",
  }));

  const filteredTableData = tableData.filter((c) => {
    const matchesFilter = filter === "All" || 
                         (filter === "Active" && c.status === "ACTIVE") ||
                         (filter === "Inactive" && c.status === "INACTIVE") ||
                         (filter.toLowerCase() === c.status?.toLowerCase());
    
    const matchesSearch =
      !searchQuery ||
      c.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone?.includes(searchQuery) ||
      c.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Kanban columns
  const kanbanColumns = statuses
    .filter((s) => s !== "All")
    .map((status) => ({
      title: status,
      cards: contacts.filter((c) => c.status === status.toUpperCase() || 
                                  (status === "Active" && c.status === "ACTIVE") ||
                                  (status === "Inactive" && c.status === "INACTIVE")),
    }));

  const handleEdit = (id) => {
    navigate(`/${rolePath}/contacts/${id}`);
  };

  // Contact toggle handler
  const handleContactToggle = async (id, newValue) => {
    const isActivating = newValue === true;

    // Optimistic update
    setContactToggles((prev) => ({
      ...prev,
      [id]: isActivating,
    }));

    if (!isActivating) {
      const confirmDeactivate = window.confirm(
        "Are you sure you want to deactivate this contact?"
      );
      if (!confirmDeactivate) {
        setContactToggles((prev) => ({ ...prev, [id]: true }));
        showInfo("Contact deactivation cancelled");
        return;
      }
    }

    try {
      if (isActivating) {
        await dispatch(adminActivateContact(id)).unwrap();
        showSuccess("Contact activated successfully");
      } else {
        await dispatch(adminDeactivateContact(id)).unwrap();
        showSuccess("Contact deactivated successfully");
      }
    } catch (err) {
      // Rollback on failure
      setContactToggles((prev) => ({
        ...prev,
        [id]: !isActivating,
      }));
      showError(err || "Failed to update contact status");
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
          <p className="text-gray-600">Manage all your contacts in one place</p>
        </div>

        <button
          onClick={() => navigate(`/${rolePath}/create-contact/${customerId}`)}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          <span>+</span> New Contact
        </button>
      </div>

      {/* Statistics Cards */}
      <ContactStats stats={contactStats} />

      {/* Status Filters */}
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

      {/* Search + View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        {/* Search - only shown in table view */}
        {activeTab === "table" && (
          <div className="relative w-full md:w-96">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts by name, email, phone, company..."
              className="w-full h-10 pl-10 pr-3 rounded-lg border text-sm outline-none focus:border-cyan"
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-medium">Error loading contacts</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Content Area */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border p-4">
          {filteredTableData.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <div className="text-4xl mb-4">📇</div>
              <p className="text-lg mb-2">No contacts found</p>
              <p className="text-sm mb-4">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => navigate(`/${rolePath}/create-contact/${customerId}`)}
                className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                + Add Your First Contact
              </button>
            </div>
          ) : (
            <>
              {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
              {activeTab === "table" && (
                <CommonTable
                  type="contacts"
                  data={tableData}
                  onEdit={handleEdit}
                  onStatusToggle={handleContactToggle}
                  showActions={true}
                  showExport={false}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}