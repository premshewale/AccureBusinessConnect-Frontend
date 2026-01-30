import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";

import { adminGetUserById } from "../../../services/user/adminGetUserByIdApi";
import { resetAdminGetUserById } from "../../../slices/user/adminGetUserByIdSlice";
import { adminUpdateUser } from "../../../services/user/adminUpdateUserApi";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.adminGetUserById);
  const { loading: updateLoading } = useSelector(
    (state) => state.adminUpdateUser,
  );

  // 👉 get logged in role from auth slice
  const role = useSelector((state) => state.auth.role);

  // 👉 convert role to url part: ADMIN -> admin, SUB_ADMIN -> sub-admin
  const rolePath = role ? role.toLowerCase().replace("_", "-") : "admin"; // fallback

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
    if (user) {
      setEditedData(user);
    }
  }, [user]);

  // 🔹 Save
  const handleSave = () => {
    dispatch(
      adminUpdateUser({
        id,
        payload: editedData,
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/${rolePath}/users`);
      }
    });
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
