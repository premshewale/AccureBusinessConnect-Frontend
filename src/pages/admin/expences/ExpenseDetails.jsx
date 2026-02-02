import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";

import { adminGetExpenseById } from "../../../services/expenses/adminGetExpenseByIdApi";
import { resetAdminGetExpenseById } from "../../../slices/expenses/adminGetExpenseByIdSlice";
import { adminUpdateExpense } from "../../../services/expenses/adminUpdateExpenseApi";

// toast helpers
import { showSuccess, showError, showWarning } from "../../../utils/toast";

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { expense, loading } = useSelector(
    (state) => state.adminGetExpenseById
  );

  const { loading: updateLoading } = useSelector(
    (state) => state.adminUpdateExpense
  );

  // role path for navigation
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

  const [editedData, setEditedData] = useState({});

  // Fetch expense by ID
  useEffect(() => {
    dispatch(adminGetExpenseById(id));
    return () => {
      dispatch(resetAdminGetExpenseById());
    };
  }, [id, dispatch]);

  // Sync API data to local state
  useEffect(() => {
    if (expense) {
      setEditedData(expense);
    }
  }, [expense]);

  // Save with validation + toast
  const handleSave = () => {
    // ===== VALIDATION =====
    if (!editedData.category || editedData.category.trim() === "") {
      showWarning("Please enter a category");
      return;
    }

    if (!editedData.amount || Number(editedData.amount) <= 0) {
      showWarning("Amount must be greater than 0");
      return;
    }

    if (!editedData.date) {
      showWarning("Please select a date");
      return;
    }

    if (!editedData.status) {
      showWarning("Please select a status");
      return;
    }

    if (!editedData.description || editedData.description.trim() === "") {
      showWarning("Description is required");
      return;
    }

    // ===== API CALL =====
    dispatch(
      adminUpdateExpense({
        id,
        payload: {
          // convert to uppercase to match backend enum
          category: editedData.category.trim().toUpperCase(),
          amount: Number(editedData.amount),
          date: editedData.date,
          status: editedData.status,
          description: editedData.description.trim(),
        },
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          showSuccess("Expense updated successfully");
          navigate(`/${rolePath}/expenses`);
        } else {
          showError("Failed to update expense");
        }
      })
      .catch(() => {
        showError("Something went wrong while updating expense");
      });
  };

  if (loading) return <div className="p-4">Loading expense details...</div>;
  if (!expense)
    return <div className="p-4 text-red-500">Expense not found</div>;

  return (
    <CommonDetails
      title="Expense Details"
      data={editedData}
      fields={[
        { name: "id", label: "Expense ID", readOnly: true },

        // free text category (editable)
        {
          name: "category",
          label: "Category",
          type: "text",
        },

        { name: "amount", label: "Amount (₹)", type: "number" },
        { name: "date", label: "Date", type: "date" },

        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["PENDING", "APPROVED", "REJECTED"],
        },

        { name: "relatedCustomerName", label: "Customer", readOnly: true },
        { name: "departmentName", label: "Department", readOnly: true },
        { name: "ownerName", label: "Owner", readOnly: true },

        {
          name: "description",
          label: "Description",
          type: "textarea",
        },

        { name: "createdAt", label: "Created At", readOnly: true },
        { name: "updatedAt", label: "Updated At", readOnly: true },
      ]}
      isEditMode={true}
      editedData={editedData}
      setEditedData={setEditedData}
      onSave={handleSave}
      loading={updateLoading}
      onBack={() => navigate(`/${rolePath}/expenses`)}
    />
  );
}
