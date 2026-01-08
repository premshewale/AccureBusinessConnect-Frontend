import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";

import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonPagination from "../../../components/common/CommonPagination.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";

import { adminGetAllUsers } from "../../../services/user/adminGetAllUsersApi";
import { adminDeleteUser } from "../../../services/user/adminDeleteUserApi";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users = [],
    loading,
    error,
  } = useSelector((state) => state.adminGetAllUsers);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Fetch users
  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  // Reset page on filter/search
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const roles = ["All", "ADMIN", "SUB_ADMIN", "STAFF"];

  // 🔍 Filtered users (memoized)
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => filter === "All" || user.roleKey === filter)
      .filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase())
      );
  }, [users, filter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔹 Edit handler (FIX)
  const handleEdit = (id) => {
    navigate(`/admin/users/${id}`);
  };

  // 🔹 Status toggle (future API)
  const handleStatusToggle = (id, status) => {
    console.log("User ID:", id, "New Status:", status);
    // dispatch(updateUserStatus({ id, status }))
  };

  // 🔹 Delete handler
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      dispatch(adminDeleteUser(id));
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Users</h3>
          <p className="text-sm text-fontgrey">Manage all system users</p>
        </div>

        <div className="flex gap-3">
          <CommonExportButton data={filteredUsers} fileName="users" />

          <button
            onClick={() => navigate("/admin/create-user")}
            className="px-4 py-2 bg-cyan text-white rounded-lg shadow"
          >
            + New User
          </button>
        </div>
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`rounded-[8px] px-4 py-1 text-sm font-medium border
              w-[123px] h-[27px]
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

      {/* Search */}
      <div className="w-full flex justify-start mt-4 mb-2">
        <div className="relative w-[430px]">
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[30px] rounded-[8px] border pl-10 pr-3 text-sm outline-none"
          />
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table */}
      <div className="mt-6">
        <CommonTable
          type="users"
          data={paginatedUsers}
          onEdit={handleEdit}
          onStatusToggle={handleStatusToggle}
          onDelete={handleDelete}
        />

        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
