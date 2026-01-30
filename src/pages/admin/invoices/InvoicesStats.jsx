import React from "react";
import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiCreditCard,
  FiFileText,
} from "react-icons/fi";

export default function InvoicesStats({ stats }) {
  // Safe defaults when stats is not yet available
  const total = Number(stats?.total ?? 0);
  const totalAmount = Number(stats?.totalAmount ?? 0);
  const paidAmount = Number(stats?.paidAmount ?? 0);
  const dueAmount = Number(stats?.dueAmount ?? 0);
  const paidCount = Number(stats?.paid ?? 0);
  const overdueCount = Number(stats?.overdue ?? 0);

  const formatCurrency = (num) =>
    `₹${num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Use numeric values for progress calculation
  const cards = [
    {
      title: "Total Invoices",
      rawValue: total,
      displayValue: total,
      icon: <FiFileText size={24} className="text-white" />,
      color: "bg-blue-500",
      description: "all records",
      isAmount: false,
    },
    {
      title: "Total Amount",
      rawValue: totalAmount,
      displayValue: formatCurrency(totalAmount),
      icon: <FiDollarSign size={24} className="text-white" />,
      color: "bg-green-500",
      description: "total billed",
      isAmount: true,
    },
    {
      title: "Amount Paid",
      rawValue: paidAmount,
      displayValue: formatCurrency(paidAmount),
      icon: <FiCheckCircle size={24} className="text-white" />,
      color: "bg-teal-500",
      description: "collected",
      isAmount: true,
    },
    {
      title: "Pending Amount",
      rawValue: dueAmount,
      displayValue: formatCurrency(dueAmount),
      icon: <FiClock size={24} className="text-white" />,
      color: "bg-yellow-500",
      description: "awaiting payment",
      isAmount: true,
    },
    {
      title: "Paid Invoices",
      rawValue: paidCount,
      displayValue: paidCount,
      icon: <FiCreditCard size={24} className="text-white" />,
      color: "bg-purple-500",
      description: "status = PAID",
      isAmount: false,
    },
    {
      title: "Overdue",
      rawValue: overdueCount,
      displayValue: overdueCount,
      icon: <FiAlertCircle size={24} className="text-white" />,
      color: "bg-red-500",
      description: "status = OVERDUE",
      isAmount: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {cards.map((card, index) => {
        // Progress only makes sense for amount-based cards
        const progressBase = totalAmount > 0 ? totalAmount : 1;
        const progress = card.isAmount
          ? Math.min((card.rawValue / progressBase) * 100, 100)
          : 0;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800">
                  {card.displayValue}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {card.description}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
            </div>

            {/* Progress bar only for amount cards */}
            {card.isAmount && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${card.color}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
