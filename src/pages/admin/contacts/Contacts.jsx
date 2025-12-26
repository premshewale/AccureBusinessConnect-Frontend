import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { adminGetContacts } from "../../../services/contact/adminGetContactsApi";

export default function Contacts() {
  const [activeTab, setActiveTab] = useState("kanban");
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerId } = useParams();

  const { contacts, loading, error } = useSelector(
    (state) => state.adminGetContacts
  );

  useEffect(() => {
    dispatch(adminGetContacts(customerId));
  }, [dispatch, customerId]);

  const statuses = ["All", "New", "Contacted", "Lost"];

  // Prepare Kanban columns dynamically based on status
  const columns = statuses
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
        })),
    }));

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

  const filteredTableData = tableData.filter(
    (c) => filter === "All" || c.status === filter
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Contacts</h3>
          <p className="text-sm text-fontgrey">
            Manage And Track Your Sales Contact
          </p>
        </div>
        <button
          onClick={() => navigate(`/admin/create-contact/${customerId}`)}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + New Contact
        </button>
      </div>

      {activeTab === "table" && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-[8px] px-4 py-1 text-sm font-medium border-[0.8px] w-[123px] h-[27px] opacity-100
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

      {loading && <p>Loading contacts...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-row">
        {activeTab === "table" && (
          <div className="w-full flex justify-start mt-4 mb-2">
            <div className="relative w-[430px]">
              <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Contact, contacts, deals..."
                className="w-full h-[30px] rounded-[8px] border-[0.5px] pl-10 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        )}

        <div className="w-full flex justify-end mt-4">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
                ${
                  activeTab === "kanban"
                    ? "bg-white border-cyan text-cyan shadow"
                    : "bg-transparent hover:bg-gray-100 border-gray-300"
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
                    : "bg-transparent hover:bg-gray-100 border-gray-300"
                }`}
            >
              <RxTable size={14} />
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "kanban" && <Kanban columns={columns} />}
        {activeTab === "table" && (
          <CommonTable type="Contact" data={filteredTableData} />
        )}
      </div>
    </>
  );
}
