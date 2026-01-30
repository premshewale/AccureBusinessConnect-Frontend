import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CommonDetails from "../../../components/common/CommonDetails";

import { adminGetExpenseById } from "../../../services/expenses/adminGetExpenseByIdApi";
import { resetAdminGetExpenseById } from "../../../slices/expenses/adminGetExpenseByIdSlice";
import { adminUpdateExpense } from "../../../services/expenses/adminUpdateExpenseApi";

export default function ExpenseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { expense, loading } = useSelector(
    (state) => state.adminGetExpenseById,
  );

  const { loading: updateLoading } = useSelector(
    (state) => state.adminUpdateExpense,
  );

  // 🔹 get rolePath (missing in your code before)
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

  const [editedData, setEditedData] = useState({});

  // 🔹 Fetch expense by ID
  useEffect(() => {
    dispatch(adminGetExpenseById(id));
    return () => {
      dispatch(resetAdminGetExpenseById());
    };
  }, [id, dispatch]);

  // 🔹 Sync API data into form state
  useEffect(() => {
    if (expense) {
      setEditedData(expense);
    }
  }, [expense]);

  // 🔹 Save updated expense
  const handleSave = () => {
    dispatch(
      adminUpdateExpense({
        id,
        payload: {
          category: editedData.category,
          amount: editedData.amount,
          date: editedData.date,
          status: editedData.status,
          description: editedData.description,
        },
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate(`/${rolePath}/expenses`);
      }
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

        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "TRAVEL",
            "OFFICE",
            "MARKETING",
            "SOFTWARE",
            "TRAINING",
            "UTILITIES",
            "ENTERTAINMENT",
            "MAINTENANCE",
            "EQUIPMENT",
            "OTHER",
          ],
        },

        { name: "amount", label: "Amount (₹)", type: "number" },
        { name: "date", label: "Date", type: "date" },

        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["PENDING", "APPROVED", "REJECTED"],
        },

        {
          name: "relatedCustomerName",
          label: "Customer",
          readOnly: true,
        },
        {
          name: "departmentName",
          label: "Department",
          readOnly: true,
        },
        {
          name: "ownerName",
          label: "Owner",
          readOnly: true,
        },

        {
          name: "description",
          label: "Description",
          type: "textarea",
        },

        {
          name: "createdAt",
          label: "Created At",
          readOnly: true,
        },
        {
          name: "updatedAt",
          label: "Updated At",
          readOnly: true,
        },
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
