import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";

import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonPagination from "../../../components/common/CommonPagination.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";

import { adminGetAllUsers } from "../../../services/user/adminGetAllUsersApi";
import {
  adminActivateUser,
  adminDeactivateUser,
} from "../../../services/user/adminToggleUserStatusApi";

import { showSuccess, showError, showInfo } from "../../../utils/toast";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    users = [],
    loading,
    error,
  } = useSelector((state) => state.adminGetAllUsers);
  // 👉 get logged in role from auth slice
  const role = useSelector((state) => state.auth.role);

  // 👉 convert role to url part: ADMIN -> admin, SUB_ADMIN -> sub-admin
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin"; // fallback

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // ✅ Local toggle state (SOURCE OF TRUTH for UI)
  const [userToggles, setUserToggles] = useState({});

  // Fetch users
  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, [dispatch]);

  // ✅ Initialize toggle state ONLY ONCE (CRITICAL FIX)
  useEffect(() => {
    setUserToggles((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      const initial = {};
      users.forEach((u) => {
        initial[u.id] = u.status === "ACTIVE";
      });
      return initial;
    });
  }, [users]);

  // Reset page on filter/search
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  const roles = ["All", "ADMIN", "SUB_ADMIN", "STAFF"];

  // 🔍 Filtered users
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => filter === "All" || user.roleKey === filter)
      .filter(
        (user) =>
          user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email?.toLowerCase().includes(search.toLowerCase()),
      );
  }, [users, filter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ✅ Apply toggle state to table data
  const mappedUsers = paginatedUsers.map((user) => ({
    ...user,
    status:
      userToggles[user.id] === undefined
        ? user.status
        : userToggles[user.id]
          ? "ACTIVE"
          : "INACTIVE",
  }));

const handleView = (user) => {
  const id = user?.id || user;
  if (!id) return;
  navigate(`/${rolePath}/users/${id}/view`);
};


  // Edit handler
  const handleEdit = (id) => {
    navigate(`/${rolePath}/users/${id}`);
  };

  // ✅ FIXED Toggle handler
  const handleStatusToggle = async (id, newStatus) => {
    const isActivating = newStatus === "ACTIVE";

    // Optimistic UI update
    setUserToggles((prev) => ({
      ...prev,
      [id]: isActivating,
    }));

    if (!isActivating) {
      const confirmDeactivate = window.confirm(
        "Are you sure you want to deactivate this user?",
      );

      if (!confirmDeactivate) {
        setUserToggles((prev) => ({ ...prev, [id]: true }));
        showInfo("User deactivation cancelled");
        return;
      }

      try {
        await dispatch(adminDeactivateUser(id)).unwrap();
        showSuccess("User deactivated successfully");
      } catch (err) {
        showError(err || "Failed to deactivate user");
        setUserToggles((prev) => ({ ...prev, [id]: true }));
      }
    } else {
      try {
        await dispatch(adminActivateUser(id)).unwrap();
        showSuccess("User activated successfully");
      } catch (err) {
        showError(err || "Failed to activate user");
        setUserToggles((prev) => ({ ...prev, [id]: false }));
      }
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
            onClick={() => navigate(`/${rolePath}/create-user`)}
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
          data={mappedUsers}
          onView={handleView}
          onEdit={handleEdit}
          onStatusToggle={handleStatusToggle}
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
