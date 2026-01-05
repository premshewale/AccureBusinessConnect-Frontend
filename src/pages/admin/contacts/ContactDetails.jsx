import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommonDetails from "../../../components/common/CommonDetails.jsx";

import { adminGetContactById } from "../../../services/contact/adminGetContactByIdApi";
import { resetContactDetails } from "../../../slices/contact/adminGetContactByIdSlice";
import { adminUpdateContact } from "../../../services/contact/adminUpdateContactApi";

export default function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, contact, error } = useSelector(
    (state) => state.adminGetContactById
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});

  /* =======================
     FETCH CONTACT
  ======================= */
  useEffect(() => {
    dispatch(adminGetContactById(id));

    return () => {
      dispatch(resetContactDetails());
    };
  }, [dispatch, id]);

  /* =======================
     SYNC LOCAL STATE
  ======================= */
  useEffect(() => {
    if (contact) {
      setEditedData({
        id: contact.id || "",
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        role: contact.role || "",
        customerName: contact.customerName || "",
        primary: contact.primary ?? false,
      });
    }
  }, [contact]);

  if (loading)
    return (
      <p className="mt-6 text-gray-500 text-center">
        Loading contact details...
      </p>
    );

  if (error)
    return <p className="mt-6 text-red-500 text-center">{error}</p>;

  if (!contact) return null;

  /* =======================
     FIELD DEFINITIONS
  ======================= */
  const contactFields = [
    { name: "id", label: "Contact ID", readOnly: true },
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "role", label: "Role" },
    { name: "customerName", label: "Customer", readOnly: true },
    {
      name: "primary",
      label: "Primary Contact",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      format: (val) => (val ? "Yes" : "No"),
    },
  ];

  /* =======================
     HANDLERS
  ======================= */
  const handleEdit = () => setIsEditMode(true);
  const handleCancelEdit = () => setIsEditMode(false);

  const handleSave = async () => {
    try {
      await dispatch(
        adminUpdateContact({
          id,
          payload: editedData,
        })
      ).unwrap();

      dispatch(adminGetContactById(id));
      alert("Contact updated successfully");
      setIsEditMode(false);
    } catch (err) {
      alert(err?.message || "Failed to update contact");
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="p-6 md:p-12">
      <button
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <CommonDetails
        title="Contact Details"
        data={editedData}
        fields={contactFields}
        isEditMode={isEditMode}
        editedData={editedData}
        setEditedData={setEditedData}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    </div>
  );
}
