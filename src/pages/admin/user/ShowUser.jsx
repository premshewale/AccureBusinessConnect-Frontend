import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ShowDetails from "../../../components/common/ShowDetails.jsx";
import { adminGetUserById } from "../../../services/user/adminGetUserByIdApi";
import { resetAdminGetUserById } from "../../../slices/user/adminGetUserByIdSlice";

export default function ShowUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.adminGetUserById
  );
  const { role } = useSelector((state) => state.auth);

  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  /* =======================
     FETCH USER
  ======================= */
  useEffect(() => {
    if (id) dispatch(adminGetUserById(id));

    return () => {
      dispatch(resetAdminGetUserById());
    };
  }, [dispatch, id]);

  /* =======================
     STATES
  ======================= */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-t-2 border-cyan rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-6">
        {typeof error === "string"
          ? error
          : "Failed to fetch user details"}
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-gray-500 mt-6">
        User not found
      </p>
    );
  }

  /* =======================
     FORMAT DATA
  ======================= */
  const formattedUser = {
    ID: user.id,
    Name: user.name || "-",
    Email: user.email || "-",
    Job_Title: user.jobTitle || "-",
    Role: user.roleName || "-",
    Status: user.status || "-",
    Department: user.departmentName || "-",
    Phone_Extension: user.phoneExtension || "-",
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/${rolePath}/users`)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      {/* User Details */}
      <ShowDetails title="User Details" data={formattedUser} />
    </div>
  );
}
