import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";

export default function Activity() {
  const activities = [
    {
      icon: <IoCallOutline size={26} className="text-green" />,
      title: "Called Mr. Sangvi",
      time: "2 minutes ago",
    },
    {
      icon: <MdOutlineMessage size={26} className="text-green" />,
      title: "Messaged Mr. Sangvi",
      time: "5 minutes ago",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="font-Lato mb-4 font-bold text-[22px] text-cyanHover text-center">
        Recent Activity
      </h3>

      <div className="flex flex-col gap-4">
        {activities.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-4">
            <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded-full">
              {item.icon}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-[16px]">{item.title}</span>
              <span className="text-gray-500 text-sm">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
