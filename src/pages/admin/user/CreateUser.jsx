import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import { adminCreateUser } from "../../../services/user/adminCreateUserApi";
import { resetAdminCreateUser } from "../../../slices/user/adminCreateUserSlice";
import { showError, showSuccess } from "../../../utils/toast"; 

export default function CreateUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(
    (state) => state.adminCreateUser
  );

  // ✅ get logged-in user role
  const { role } = useSelector((state) => state.auth);

  // ✅ role options based on logged-in user
  const roleOptions =
    role === "ADMIN"
      ? [
          { label: "Sub Admin", value: "SUB_ADMIN" },
          { label: "Staff", value: "STAFF" },
        ]
      : [
          { label: "Staff", value: "STAFF" },
        ];

  const fields = [
    { type: "text", label: "Name", name: "name" },
    { type: "email", label: "Email", name: "email" },
    { type: "password", label: "Password", name: "password" },
    { type: "text", label: "Job Title", name: "jobTitle" },
    {
      type: "select",
      label: "Role",
      name: "roleKey",
      options: roleOptions,
    },
    { type: "number", label: "Department ID", name: "departmentId" },
  ];

  // ✅ validation (unchanged)
  const validateForm = (data) => {
    if (!data.name || data.name.trim().length < 3) {
      showError("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    if (!data.password || data.password.length < 8) {
      showError("Password must be at least 8 characters");
      return false;
    }

    if (!data.jobTitle) {
      showError("Job Title is required");
      return false;
    }

    if (!data.roleKey && role === "ADMIN") {
      showError("Please select a role");
      return false;
    }

    if (!data.departmentId || Number(data.departmentId) <= 0) {
      showError("Department ID must be greater than 0");
      return false;
    }

    return true;
  };

  // ✅ auto-set STAFF if not ADMIN
  const handleSubmit = (data) => {
    if (!validateForm(data)) return;

    const finalData = {
      ...data,
      roleKey: role === "ADMIN" ? data.roleKey : "STAFF",
    };

    dispatch(adminCreateUser(finalData));
  };

  useEffect(() => {
    if (success) {
      showSuccess("User created successfully");
      dispatch(resetAdminCreateUser());
      navigate("/admin/users");
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      showError(
        typeof error === "string" ? error : error.message || "Something went wrong"
      );
    }
  }, [error]);

  return (
    <>
      {loading && <p>Creating user...</p>}
      {error && (
        <p style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </p>
      )}

      <CommonForm
        title="Create User"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </>
  );
}
