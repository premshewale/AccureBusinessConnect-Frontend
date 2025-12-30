import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import CommonDetails from "../../../components/common/CommonDetails";

import { updateDepartment } from "../../../services/department/updatedepartmentAPI";
import { getAllDepartments } from "../../../services/department/departmentAPI";
import { clearDepartmentState } from "../../../slices/department/departmentSlice";

export default function UpdateDepartment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { departments, isLoading, error } = useSelector(
    (state) => state.department
  );

  const [editedData, setEditedData] = useState({ name: "" });

  // Find department by ID
  const department = departments.find((dept) => String(dept.id) === String(id));

  // Fetch all departments if not loaded
  useEffect(() => {
    if (!departments.length) {
      dispatch(getAllDepartments());
    }
  }, [dispatch, departments.length]);

  // Prefill the form when department data is available
  useEffect(() => {
    if (department) {
      setEditedData({ name: department.name || "" });
    }
  }, [department]);

  const fields = [
    {
      name: "id",
      label: "Department ID",
      value: id,
      readOnly: true,
    },
    {
      name: "name",
      label: "Department Name",
      type: "text",
      value: editedData.name,
    },
  ];

  const handleSave = () => {
    // Log payload for debugging
    console.log("Updating department:", id, editedData);

    dispatch(updateDepartment({ id, payload: editedData }))
      .unwrap()
      .then(() => {
        dispatch(clearDepartmentState());
        navigate("/admin/department");
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  const handleBack = () => navigate("/admin/department");

  if (!department && isLoading) {
    return <p className="p-6 text-gray-500">Loading department...</p>;
  }

  if (!department && !isLoading) {
    return <p className="p-6 text-red-500">Department not found</p>;
  }

  return (
    <div className="p-6">
      <CommonDetails
        title="Edit Department"
        data={department}
        fields={fields}
        editedData={editedData}
        setEditedData={setEditedData}
        onSave={handleSave}
        onBack={handleBack}
        loading={isLoading}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
