import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import CommonTable from "../../../components/common/CommonTable.jsx";

export default function Staff() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Dummy Staff Data
  useEffect(() => {
    const dummyStaff = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@abc.com",
        roleKey: "ADMIN",
        jobTitle: "System Administrator",
        department: "IT",
        createdAt: "2025-12-01",
      },
      {
        id: 2,
        name: "Raj Manager",
        email: "raj.manager@abc.com",
        roleKey: "SUB_ADMIN",
        jobTitle: "Sales Manager",
        department: "Sales",
        createdAt: "2025-12-02",
      },
      {
        id: 3,
        name: "Servesh Patil",
        email: "servesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        createdAt: "2025-12-02",
      },
      {
        id: 4,
        name: "Siddhesh Kulkarni",
        email: "siddhesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        createdAt: "2025-12-03",
      },
      {
        id: 5,
        name: "Neha Sharma",
        email: "neha.sharma@abc.com",
        roleKey: "STAFF",
        jobTitle: "HR Executive",
        department: "HR",
        createdAt: "2025-12-04",
      },
      {
        id: 6,
        name: "Amit Verma",
        email: "amit.verma@abc.com",
        roleKey: "SUB_ADMIN",
        jobTitle: "Operations Manager",
        department: "Operations",
        createdAt: "2025-12-05",
      },
    ];

    setStaff(dummyStaff);
  }, []);


  // Filter + Search Logic
  const filteredStaff = staff
    .filter((user) => filter === "All" || user.roleKey === filter)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-semibold">Staff</h3>
          <p className="text-sm text-gray-500">Manage all system staff</p>
        </div>

        <button
          onClick={() => navigate("/admin/create-user")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:opacity-90"
        >
          + New User
        </button>
      </div>


      {/* Search */}
      <div className="mb-4">
        <div className="relative w-[420px]">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[34px] pl-10 pr-3 rounded-md border text-sm outline-none focus:ring-1 focus:ring-cyan"
          />
        </div>
      </div>

      {/* Table */}
      <CommonTable type="staff" data={filteredStaff} />
    </>
  );
}
