import React, { useState, useEffect } from "react";
import { RxDashboard, RxTable } from "react-icons/rx";

export default function Leads() {
  const [activeTab, setActiveTab] = useState("kanban");

  useEffect(() => {
    setActiveTab("kanban");
  }, []);

  return (
    <>
      {/* TOP HEADER */}
      <div className="flex flex-row justify-between items-center mb-4">
        <div>
          <h3 className="text-[22px] font-lato">Leads</h3>
          <p>Manage And Track Your Sales Leads</p>
        </div>

        <button className="px-4 py-2 bg-cyan text-white rounded-lg shadow">
          + New Lead
        </button>
      </div>

      <div className="w-full flex justify-end">
        {/* TABS */}
        <div className="flex flex-row gap-4 mt-4  ">
          {/* KANBAN BUTTON */}
          <button
            onClick={() => setActiveTab("kanban")}
            className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border 
            ${
              activeTab === "kanban"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300"
            }
          `}
          >
            <RxDashboard size={14} />
            Kanban
          </button>

          {/* TABLE BUTTON */}
          <button
            onClick={() => setActiveTab("table")}
            className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border 
            ${
              activeTab === "table"
                ? "bg-white border-cyan text-cyan shadow"
                : "bg-transparent hover:bg-gray-100 border-gray-300"
            }
          `}
          >
            <RxTable size={14} />
            Table
          </button>
        </div>
      </div>

      {/* CONTENT BASED ON ACTIVE TAB */}
      <div className="mt-6">
        {activeTab === "kanban" && <p>📌 Kanban View Goes Here</p>}
        {activeTab === "table" && <p>📋 Table View Goes Here</p>}
      </div>
    </>
  );
}
