import React from "react";
import KanbanCard from "./KanbanCard";

export default function Kanban({ columns }) {
  return (
    <div className="flex gap-6">
      {columns.map((col) => (
        <div
          key={col.title}
          className="bg-[#EFF5F5] w-[330px] rounded-xl p-4 shadow h-[80vh] overflow-y-auto"
        >
          {/* Column title + count */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{col.title}</h2>
            <span className="px-3 py-1 bg-gray-300 rounded-full text-sm font-medium">
              {col.cards.length}
            </span>
          </div>

          {/* Cards */}
          {col.cards.map((card) => (
            <KanbanCard key={card.id} {...card} />
          ))}
        </div>
      ))}
    </div>
  );
}
