import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CommonForm from "../../../components/common/CommonForm.jsx";
import { adminCreateContact } from "../../../services/contact/adminCreateContactApi";
import { resetAdminCreateContact } from "../../../slices/contact/adminCreateContactSlice";
import { showError, showSuccess } from "../../../utils/toast"; // ✅ added

export default function CreateContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerId } = useParams();

  const { loading, success, error } = useSelector(
    (state) => state.adminCreateContact,
  );
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

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
      value: "false",
      hidePlaceholder: true,
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
  ];

  // ✅ VALIDATION ADDED (no existing logic removed)
  const validateForm = (data) => {
    if (!data.firstName || data.firstName.trim().length < 2) {
      showError("First name must be at least 2 characters");
      return false;
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      showError("Last name must be at least 2 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      showError("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!data.phone || !phoneRegex.test(data.phone)) {
      showError("Phone number must be 10 digits");
      return false;
    }

    if (!data.role) {
      showError("Please select a contact role");
      return false;
    }

    return true;
  };

  // 🔹 ONLY UPDATED INTERNALLY
  const handleSubmit = (data) => {
    if (!validateForm(data)) return;

    const payload = {
      ...data,
      isPrimary: data.isPrimary === "true",
    };

    dispatch(
      adminCreateContact({
        customerId,
        data: payload,
      }),
    );
  };

  useEffect(() => {
    if (success) {
      showSuccess("Contact created successfully"); // ✅ replaced alert
      dispatch(resetAdminCreateContact());
      navigate(`/${rolePath}/customers/${customerId}/contacts`);
    }
  }, [success, dispatch, navigate, customerId]);

  // ✅ optional toast for API error
  useEffect(() => {
    if (error) {
      showError(
        typeof error === "string"
          ? error
          : error.message || "Something went wrong",
      );
    }
  }, [error]);

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
