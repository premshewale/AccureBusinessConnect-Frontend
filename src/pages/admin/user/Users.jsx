import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { IoSearchSharp } from "react-icons/io5";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Dummy Users Data
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log("TOKEN:", loggedUser?.token);

    const dummyUsers = [
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
        name: "Servesh",
        email: "servesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        createdAt: "2025-12-02",
      },
      {
        id: 4,
        name: "Siddhesh",
        email: "siddhesh@abc.com",
        roleKey: "STAFF",
        jobTitle: "Sales Executive",
        department: "Sales",
        createdAt: "2025-12-03",
      },
    ];

    setUsers(dummyUsers);
  }, []);

  // Roles for filtering
  const roles = ["All", "ADMIN", "SUB_ADMIN", "STAFF"];

  // Filtered and searched users
  const filteredUsers = users
    .filter((user) => filter === "All" || user.roleKey === filter)
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Users</h3>
          <p className="text-sm text-fontgrey">Manage all system users</p>
        </div>

        <button
          onClick={() => navigate("/admin/create-user")}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
        >
          + New User
        </button>
      </div>

      {/* Role Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`rounded-[8px] px-4 py-1 text-sm font-medium border-[0.8px]
              w-[123px] h-[27px] opacity-100
              ${
                filter === role
                  ? "bg-cyan text-white"
                  : "bg-white text-[#5f5f5f] hover:bg-cyan hover:text-white"
              }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="w-full flex justify-start mt-4 mb-2">
        <div className="relative w-[430px]">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[30px] rounded-[8px] border-[0.5px] pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6">
        <CommonTable type="users" data={filteredUsers} />
      </div>
    </>
  );
}
