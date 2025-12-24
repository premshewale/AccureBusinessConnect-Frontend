import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommonForm from "../../../components/common/CommonForm";
import CommonTable from "../../../components/common/CommonTable";

import {
  createDepartment,
  getAllDepartments,
} from "../../../services/department/departmentAPI";

export default function Department() {
  const dispatch = useDispatch();

  const { departments, isLoading, error } = useSelector(
    (state) => state.department
  );

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
      });
  };

  return (
    <div className="p-6 space-y-8">
      {/* Create Department Form */}
      <CommonForm
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
        />
      </div>
    </div>
  );
}
