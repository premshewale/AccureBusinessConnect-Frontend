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
    (state) => state.adminGetExpenseById
  );

  const { loading: updateLoading } = useSelector(
    (state) => state.adminUpdateExpense
  );

  const [editedData, setEditedData] = useState({});

  // 🔹 Fetch expense by ID
  useEffect(() => {
    dispatch(adminGetExpenseById(id));
    return () => {
      dispatch(resetAdminGetExpenseById());
    };
  }, [id, dispatch]);

  // 🔹 Sync API data into form
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
        payload: editedData,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/admin/expenses");
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
        { name: "title", label: "Title" },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            "Office",
            "Travel",
            "Marketing",
            "Software",
            "Training",
            "Utilities",
            "Entertainment",
            "Maintenance",
            "Equipment",
            "Other",
          ],
        },
        { name: "amount", label: "Amount (₹)", type: "number" },
        { name: "date", label: "Date", type: "date" },
        { name: "vendor", label: "Vendor" },
        {
          name: "paymentMethod",
          label: "Payment Method",
          type: "select",
          options: [
            "Cash",
            "Credit Card",
            "Debit Card",
            "Bank Transfer",
            "Cheque",
            "UPI",
            "Other",
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["pending", "approved", "rejected"],
        },
        { name: "receiptNumber", label: "Receipt Number" },
        {
          name: "description",
          label: "Description",
          type: "textarea",
        },
      ]}
      isEditMode={true}
      editedData={editedData}
      setEditedData={setEditedData}
      onSave={handleSave}
      loading={updateLoading}
      onBack={() => navigate("/admin/expenses")}
    />
  );
}
