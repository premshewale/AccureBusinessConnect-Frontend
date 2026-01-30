import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CommonForm from "../../../components/common/CommonForm";
import CommonTable from "../../../components/common/CommonTable";
import { deleteDepartment } from "../../../services/department/deleteDepartmentAPI";

import {
  createDepartment,
  getAllDepartments,
} from "../../../services/department/departmentAPI";

export default function Department() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { departments, isLoading, error } = useSelector(
    (state) => state.department
  );

  // 👉 get logged in role from auth slice
  const role = useSelector((state) => state.auth.role);

  // 👉 convert role to url part: ADMIN -> admin, SUB_ADMIN -> sub-admin
  const rolePath = role
    ? role.toLowerCase().replace("_", "-")
    : "admin"; // fallback

  // 👉 used to reset the form after successful add
  const [formKey, setFormKey] = useState(0);

  const departmentFields = [
    {
      name: "name",
      label: "Department Name",
      type: "text",
      placeholder: "Enter department name",
    },
  ];

  // Fetch departments on page load
  useEffect(() => {
    dispatch(getAllDepartments());
  }, [dispatch]);

  const handleSubmit = (formData) => {
    dispatch(createDepartment({ name: formData.name }))
      .unwrap()
      .then(() => {
        dispatch(getAllDepartments()); // refresh list after create
        setFormKey((prev) => prev + 1); // 👉 reset/clear the form
      });
  };

  // 👉 Edit button handler with dynamic role in URL
  const handleEdit = (id) => {
    navigate(`/${rolePath}/departments/${id}/edit`);
  };

  // 👉 Delete button handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartment(id))
        .unwrap()
        .then(() => dispatch(getAllDepartments()))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Create Department Form */}
      <CommonForm
        key={formKey}   // 👉 this makes inputs blank after successful add
        title="Create Department"
        fields={departmentFields}
        submitText="Add Department"
        onSubmit={handleSubmit}
      />

      {/* Department List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Departments</h2>

        {isLoading && (
          <p className="text-gray-500">Loading departments...</p>
        )}

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <CommonTable
          type="departments"
          data={departments || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
