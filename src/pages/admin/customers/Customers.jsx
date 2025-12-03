import React, { useState, useEffect } from "react";
import { RxDashboard, RxTable } from "react-icons/rx";
import Kanban from "../../../components/common/Kanban.jsx";
import CommonTable from "../../../components/common/CommonTable.jsx";
import { IoSearchSharp } from "react-icons/io5";

export default function Customers() {
  const [activeTab, setActiveTab] = useState("kanban");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setActiveTab("kanban");
  }, []);

  const columns = [
    {
      title: "New Customers",
      cards: [
        {
          id: 48,
          name: "Mr. Suresh",
          service: "Website development",
          phone: "+91 85796 56892",
          createdOn: "16 Nov 2025",
          status: "New",
        },
      ],
    },
    {
      title: "Contacted",
      cards: [
        {
          id: 49,
          name: "Mr. Raj",
          service: "Branding & Marketing",
          phone: "+91 99887 11223",
          createdOn: "17 Nov 2025",
          status: "Contacted",
        },
      ],
    },
    {
      title: "Lost",
      cards: [
        {
          id: 32,
          name: "Mr. Milind",
          service: "App Development",
          phone: "+91 88994 22112",
          createdOn: "15 Nov 2025",
          status: "Lost",
        },
      ],
    },
  ];

  const tableData = columns.flatMap((col) => col.cards);

  const filteredTableData = tableData.filter(
    (card) => filter === "All" || card.status === filter
  );

  const statuses = [
    "All",
    "New",
    "Contacted",
    "Proposal",
    "Lost",
    "In Progress",
  ];

  return (
    <>
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Customers</h3>
          <p className="text-sm text-fontgrey">
            Manage And Track Your Sales Customers
          </p>
        </div>

        <button className="px-4 py-2 bg-cyan text-white rounded-lg shadow">
          + New Lead
        </button>
      </div>

      {activeTab === "table" && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`rounded-[8px] px-4 py-1 text-sm font-medium border-[0.8px]
        w-[123px] h-[27px] opacity-100
        ${
          filter === status
            ? "bg-cyan text-white"
            : "bg-white text-[#5f5f5f] hover:bg-cyan hover:text-white"
        }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-row">
        {activeTab === "table" && (
          <div className="w-full flex justify-start mt-4 mb-2">
            <div className="relative w-[430px]">
              <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Customers, contacts, deals....."
                className="w-full h-[30px] rounded-[8px] border-[0.5px] pl-10 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        )}

        <div className="w-full flex   justify-end mt-4">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setActiveTab("kanban")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
        ${
          activeTab === "kanban"
            ? "bg-white border-cyan text-cyan shadow"
            : "bg-transparent hover:bg-gray-100 border-gray-300"
        }`}
            >
              <RxDashboard size={14} />
              Kanban
            </button>

            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
        ${
          activeTab === "table"
            ? "bg-white border-cyan text-cyan shadow"
            : "bg-transparent hover:bg-gray-100 border-gray-300"
        }`}
            >
              <RxTable size={14} />
              Table
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "kanban" && <Kanban columns={columns} />}
        {activeTab === "table" && (
          <CommonTable type="Customers" data={filteredTableData} />
        )}
      </div>
    </>
  );
}
