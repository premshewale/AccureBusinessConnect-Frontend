import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";
import { showError, showSuccess } from "../../../utils/toast";

import { adminGetUserById } from "../../../services/user/adminGetUserByIdApi";
import { resetAdminGetUserById } from "../../../slices/user/adminGetUserByIdSlice";
import { adminUpdateUser } from "../../../services/user/adminUpdateUserApi";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.adminGetUserById);
  const { loading: updateLoading, error, success } = useSelector(
    (state) => state.adminUpdateUser
  );

  const role = useSelector((state) => state.auth.role);
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin";

  const [editedData, setEditedData] = useState({});

  // 🔹 Fetch user
  useEffect(() => {
    dispatch(adminGetUserById(id));
    return () => {
      dispatch(resetAdminGetUserById());
    };
  }, [id, dispatch]);

  // 🔹 Sync API data into form
  useEffect(() => {
    if (user) setEditedData(user);
  }, [user]);

  // 🔹 Show toast on update success/error
  useEffect(() => {
    if (success) {
      showSuccess("User updated successfully");
      navigate(`/${rolePath}/users`);
    }
    if (error) {
      showError(typeof error === "string" ? error : error.message || "Update failed");
    }
  }, [success, error, navigate, rolePath]);

  // 🔹 Validation before save
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

    if (!data.jobTitle || data.jobTitle.trim() === "") {
      showError("Job Title is required");
      return false;
    }

    if (!data.roleName) {
      showError("Please select a role");
      return false;
    }

    return true;
  };

  // 🔹 Save
  const handleSave = () => {
    if (!validateForm(editedData)) return;

    dispatch(
      adminUpdateUser({
        id,
        payload: editedData,
      })
    );
  };

  if (loading) return <div className="p-4">Loading user details...</div>;
  if (!user) return <div className="p-4 text-red-500">User not found</div>;

  return (
    <CommonDetails
      title="User Details"
      data={editedData}
      fields={[
        { name: "id", label: "User ID", readOnly: true },
        { name: "name", label: "Name" },
        { name: "email", label: "Email", readOnly: true },
        { name: "jobTitle", label: "Job Title" },
        {
          name: "roleName",
          label: "Role",
          type: "select",
          options: ["Admin", "Sub admin", "Staff"],
        },
        {
          name: "status",
          label: "Status",
          readOnly: true,
        },
        { name: "departmentName", label: "Department", readOnly: true },
        { name: "phoneExtension", label: "Phone Ext." },
      ]}
      isEditMode={true}
      editedData={editedData}
      setEditedData={setEditedData}
      onSave={handleSave}
      loading={updateLoading}
      onBack={() => navigate(`/${rolePath}/users`)}
    />
  );
}
