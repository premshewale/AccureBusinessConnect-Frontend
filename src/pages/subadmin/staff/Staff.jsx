import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { IoSearchSharp } from "react-icons/io5";

export default function Staff() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dummyUsers = [
      {
        id: 1,
        name: "Admin User",
        email: "admin@abc.com",
        roleKey: "ADMIN",
        jobTitle: "System Administrator",
        department: "IT",
        departmentId: 1,
        status: "ACTIVE",
        createdAt: "2025-12-01",
      },
      {
        id: 2,
        name: "Raj Manager",
        email: "raj.manager@abc.com",
        roleKey: "SUB_ADMIN",
        jobTitle: "Sales Manager",
        department: "Sales",
        departmentId: 2,
        status: "ACTIVE",
        createdAt: "2025-12-02",
      },
      {
        id: 3,
        name: "Servesh",
        email: "servesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        departmentId: 2,
        status: "INACTIVE",
        createdAt: "2025-12-02",
      },
      {
        id: 4,
        name: "Siddhesh",
        email: "siddhesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        departmentId: 2,
        status: "ACTIVE",
        createdAt: "2025-12-03",
      },
    ];

    setUsers(dummyUsers);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Staff</h3>
          <p className="text-sm text-fontgrey">Manage staff members</p>
        </div>

        <button
          onClick={() => navigate("/admin/create-staff")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + New Staff
        </button>
      </div>

      {/* Search */}
      <div className="w-full flex justify-start mt-4 mb-2">
        <div className="relative w-[430px]">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[30px] rounded-[8px] border-[0.5px] pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6">
        <CommonTable type="users" data={filteredUsers} />
      </div>
    </>
  );
}
