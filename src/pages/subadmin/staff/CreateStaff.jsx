import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm";
import { adminCreateUser } from "../../../services/user/adminCreateUserApi";
import { resetAdminCreateUser } from "../../../slices/user/adminCreateUserSlice";

export default function CreateStaff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector(
    (state) => state.adminCreateUser
  );

const fields = [
  { type: "text", label: "Name", name: "name" },
  { type: "email", label: "Email", name: "email" },
  { type: "password", label: "Password", name: "password" },
  { type: "text", label: "Job Title", name: "jobTitle" },

  {
    type: "text",
    label: "Role",
    name: "roleKey",
    readOnly: true,
    value: "STAFF",
  },

  { type: "number", label: "Department ID", name: "departmentId" },
];



const handleSubmit = (data) => {
  console.log("Submitting data:", data); // <-- check departmentId here
  dispatch(adminCreateUser(data));
};

  useEffect(() => {
    if (success) {
      alert("Staff created successfully");
      dispatch(resetAdminCreateUser());
      navigate("/admin/staff"); 
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      {loading && <p>Creating user...</p>}
      {error && (
        <p style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </p>
      )}

      <CommonForm
        title="Create Staff"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </>
  );
}
