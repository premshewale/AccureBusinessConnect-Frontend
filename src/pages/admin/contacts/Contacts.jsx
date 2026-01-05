import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { adminGetContacts } from "../../../services/contact/adminGetContactsApi";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "All",
    role: "All",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerId } = useParams();

  const { contacts = [], loading, error } = useSelector(
    (state) => state.adminGetContacts
  );

  useEffect(() => {
    dispatch(adminGetContacts(customerId));
  }, [dispatch, customerId]);

  const statuses = ["All", "New", "Contacted", "Lost"];

  // --- Filtered Table Data ---
  const tableData = contacts.map((c) => ({
    id: c.id,
    customer_id: c.customerId,
    firstname: c.firstName,
    lastname: c.lastName,
    email: c.email,
    phone: c.phone,
    role: c.role,
    is_primary: c.isPrimary,
    status: c.status,
    createdOn: new Date(c.createdAt).toLocaleDateString(),
  }));

  const filteredTableData = tableData.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesSearch =
      !searchQuery ||
      c.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesRole =
      filterOptions.role === "All" || c.role === filterOptions.role;
    return matchesFilter && matchesSearch && matchesRole;
  });

  // --- Kanban Columns ---
  const kanbanColumns = statuses
    .filter((s) => s !== "All")
    .map((status) => ({
      title: status,
      cards: contacts
        .filter((c) => c.status === status)
        .map((c) => ({
          id: c.id,
          customer_id: c.customerId,
          firstname: c.firstName,
          lastname: c.lastName,
          email: c.email,
          phone: c.phone,
          role: c.role,
          is_primary: c.isPrimary,
          createdOn: new Date(c.createdAt).toLocaleDateString(),
          status: c.status,
        })),
    }));

  // --- Action Handlers ---
  const handleEdit = (contact) => {
    navigate(`/admin/edit-contact/${contact.id}`);
  };

  const handleView = (contact) => {
    navigate(`/admin/contacts/${contact.id}`);
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
          onClick={() => navigate(`/admin/create-contact/${customerId}`)}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors flex items-center gap-2"
        >
          + New Contact
        </button>
      </div>

      {/* Filter Panel (Optional) */}
      {showFilter && (
        <CustomerFilter
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* Status Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
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

      {/* Search & View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        {/* Search */}
        {activeTab === "table" && (
          <div className="relative w-full md:w-64">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contact, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
            />
          </div>
        )}

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxDashboard /> Kanban
          </button>

          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxTable /> Table
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading contacts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Content */}
      <div className="mt-6">
        {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}
        {activeTab === "table" && (
          <CommonTable
            type="contacts"
            data={filteredTableData}
            onEdit={handleEdit}
            onView={handleView}
            showActions={true}
          />
        )}
      </div>
    </div>
  );
}
