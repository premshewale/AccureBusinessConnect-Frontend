import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreateContact } from "../../../services/contact/adminCreateContactApi";
import { resetAdminCreateContact } from "../../../slices/contact/adminCreateContactSlice";

export default function CreateContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerId } = useParams();

  const { loading, success, error } = useSelector(
    (state) => state.adminCreateContact
  );

  const fields = [
    {
      type: "text",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter first name",
    },
    {
      type: "text",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter last name",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      placeholder: "Enter email",
    },
    {
      type: "text",
      label: "Phone",
      name: "phone",
      placeholder: "Enter phone number",
    },
    {
      type: "select",
      label: "Role",
      name: "role",
      options: [
        { label: "Primary", value: "PRIMARY" },
        { label: "Billing", value: "BILLING" },
        { label: "Technical", value: "TECHNICAL" },
      ],
    },
    {
      type: "select",
      label: "Is Primary Contact",
      name: "isPrimary",
      value: "false", // default = No
      hidePlaceholder: true, // ✅ removes 3rd option
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
  ];

  const handleSubmit = (data) => {
    const payload = {
      ...data,
      isPrimary: data.isPrimary === "true",
    };

    dispatch(
      adminCreateContact({
        customerId,
        data: payload,
      })
    );
  };

  useEffect(() => {
    if (success) {
      alert("Contact created successfully");
      dispatch(resetAdminCreateContact());
      navigate(`/admin/customers/${customerId}/contacts`);
    }
  }, [success, dispatch, navigate, customerId]);

  return (
    <>
      {loading && <p>Creating contact...</p>}
      {error && (
        <p style={{ color: "red" }}>
          {typeof error === "string" ? error : error.message}
        </p>
      )}

      <CommonForm
        title="Create Contact"
        fields={fields}
        submitText="Create Contact"
        onSubmit={handleSubmit}
      />
    </>
  );
}
