import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { adminGetContacts } from "../../../services/contact/adminGetContactsApi";
import {
  adminAddContactToGoogle,
  adminRemoveContactFromGoogle,
} from "../../../services/contact/adminAddContactToggleApi";
import { showSuccess, showError } from "../../../utils/toast";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("table");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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
  const [googleToggles, setGoogleToggles] = useState({});

  useEffect(() => {
    const id = Number(customerId);
    if (customerId && !isNaN(id)) {
      dispatch(adminGetContacts(id));
    } else {
      console.error("Invalid customerId in route:", customerId);
    }
  }, [dispatch, customerId]);

  /* ✅ INITIALIZE TOGGLES ONLY ONCE */
  useEffect(() => {
    setGoogleToggles((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      const initial = {};
      contacts.forEach((c) => {
        initial[c.id] = c.isGoogleSynced;
      });
      return initial;
    });
  }, [contacts]);

  const statuses = ["All", "New", "Contacted", "Lost"];

  /* ✅ TABLE DATA WITH TOGGLE STATE APPLIED */
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
    is_google_synced:
      googleToggles[c.id] === undefined
        ? c.isGoogleSynced
        : googleToggles[c.id],
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
    return matchesFilter && matchesSearch;
  });

  /* ✅ KANBAN */
  const kanbanColumns = statuses
    .filter((s) => s !== "All")
    .map((status) => ({
      title: status,
      cards: contacts.filter((c) => c.status === status),
    }));

  const handleEdit = (id) => {
    navigate(`/${rolePath}/contacts/${id}`);
  };

  /* ✅ FIXED GOOGLE TOGGLE HANDLER */

  const handleGoogleToggle = async (id, newValue) => {
    // Optimistic update
    setGoogleToggles((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    try {
      if (newValue) {
        await dispatch(adminAddContactToGoogle(id)).unwrap();
        showSuccess("Contact added to Google");
      } else {
        await dispatch(adminRemoveContactFromGoogle(id)).unwrap();
        showSuccess("Contact removed from Google");
      }
    } catch (err) {
      // Rollback on failure
      setGoogleToggles((prev) => ({
        ...prev,
        [id]: !newValue,
      }));
      showError(err || "Failed to update Google sync");
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
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + New Contact
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg border ${
              filter === status
                ? "bg-cyan text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search + View Toggle */}
      <div className="flex justify-between items-center mb-4">
        {activeTab === "table" && (
          <div className="relative w-64">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contact..."
              className="w-full h-10 pl-10 pr-3 border rounded-lg"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button onClick={() => setActiveTab("kanban")}>
            <RxDashboard />
          </button>
          <button onClick={() => setActiveTab("table")}>
            <RxTable />
          </button>
        </div>
      </div>

      {loading && <p>Loading contacts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-6">
        {activeTab === "kanban" && <Kanban columns={kanbanColumns} />}

        {activeTab === "table" && (
          <CommonTable
            type="contacts"
            data={filteredTableData}
            onEdit={handleEdit}
            onStatusToggle={handleGoogleToggle}
            showActions
          />
        )}
      </div>
    </div>
  );
}
