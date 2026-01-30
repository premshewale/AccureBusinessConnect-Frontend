import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard, RxTable } from "react-icons/rx";
import { IoSearchSharp, IoFilterSharp } from "react-icons/io5";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { adminGetAllExpenses } from "../../../services/expenses/adminGetAllExpensesApi.js";
import { adminDeleteExpense } from "../../../services/expenses/adminDeleteExpenseApi.js";

import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import CommonExportButton from "../../../components/common/CommonExportButton.jsx";
import ExpensesStats from "./ExpensesStats.jsx";
import ExpensesFilter from "./ExpensesFilter.jsx";

export default function Expenses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expenses = [], loading } = useSelector(
    (state) => state.adminGetAllExpenses,
  );
  const role = useSelector((state) => state.auth.role);
  const rolePath = role?.toLowerCase().replace("_", "-") || "admin";

  const [activeTab, setActiveTab] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    dispatch(adminGetAllExpenses());
  }, [dispatch]);

  const handleCreateExpense = () => navigate(`/${rolePath}/create-expense`);
  const handleEdit = (id) =>
    navigate(`/${rolePath}/expenses/${id}`);
  const handleView = (id) =>
    navigate(`/${rolePath}/expenses/${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(adminDeleteExpense(expense.id));
    }
  };
  const handleRefresh = () => window.location.reload();

  const filteredExpenses = expenses.filter((e) => {
    if (
      searchQuery &&
      !e.category?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.description?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(e.relatedCustomerName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      !(e.ownerName || "").toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    if (
      filterStatus !== "All" &&
      e.status.toUpperCase() !== filterStatus.toUpperCase()
    )
      return false;

    return true;
  });

  const tableData = filteredExpenses.map((e) => ({
    id: e.id,
    category: e.category,
    amount: e.amount,
    date: e.date,
    description: e.description || "-",
    relatedCustomerName: e.relatedCustomerName || "-",
    departmentName: e.departmentName || "-",
    ownerName: e.ownerName || "-",
    status: e.status,
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  }));

  const kanbanColumns = ["PENDING", "APPROVED", "REJECTED"].map((status) => ({
    title: status,
    cards: filteredExpenses
      .filter((e) => e.status.toUpperCase() === status)
      .map((e) => ({
        id: e.id,
        name: e.description || e.category,
        category: e.category,
        amount: `₹${e.amount.toLocaleString("en-IN")}`,
        owner: e.ownerName || "-",
        customer: e.relatedCustomerName || "-",
        createdOn: new Date(e.createdAt).toLocaleDateString("en-IN"),
      })),
  }));

  const expenseStats = {
    total: expenses.length,
    pending: expenses.filter((e) => e.status === "PENDING").length,
    approved: expenses.filter((e) => e.status === "APPROVED").length,
    rejected: expenses.filter((e) => e.status === "REJECTED").length,
    totalAmount: expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
          <p className="text-gray-600">Track and manage all expenses</p>
        </div>
        <button
          onClick={handleCreateExpense}
          className="px-4 py-2 bg-cyan text-white rounded-lg shadow hover:bg-cyan-700 transition-colors"
        >
          + Add Expense
        </button>
      </div>

      <ExpensesStats stats={expenseStats} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <div className="flex items-center gap-4">
          <CommonExportButton data={tableData} fileName="expenses" />
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MdOutlineRefresh />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 h-10 rounded-lg border pl-10 pr-3 text-sm outline-none focus:border-cyan"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${showFilter ? "bg-cyan text-white border-cyan" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            <IoFilterSharp /> Filter
          </button>
        </div>
      </div>

      {showFilter && (
        <ExpensesFilter
          filterOptions={{ status: filterStatus }}
          setFilterOptions={{ setFilterStatus }}
          onClose={() => setShowFilter(false)}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">
          Showing {filteredExpenses.length} of {expenses.length} expenses
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxDashboard /> Kanban View
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300 text-gray-700"
            }`}
          >
            <RxTable /> Table View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan"></div>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="text-center p-8 text-gray-500">
            <p className="text-lg mb-2">No expenses found</p>
            <button
              onClick={handleCreateExpense}
              className="px-4 py-2 bg-cyan text-white rounded-lg hover:bg-cyan-700"
            >
              Add Your First Expense
            </button>
          </div>
        ) : activeTab === "kanban" ? (
          <Kanban columns={kanbanColumns} />
        ) : (
          <CommonTable
            type="expenses"
            data={tableData}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            showActions={true}
          />
        )}
      </div>
    </div>
  );
}
