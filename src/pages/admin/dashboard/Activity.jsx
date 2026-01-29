// import React from "react";
// import { IoCallOutline } from "react-icons/io5";
// import { MdOutlineMessage } from "react-icons/md";

// export default function Activity() {
//   const activities = [
//     {
//       icon: <IoCallOutline size={26} className="text-green" />,
//       title: "Called Mr. Sangvi",
//       time: "2 minutes ago",
//     },
//     {
//       icon: <MdOutlineMessage size={26} className="text-green" />,
//       title: "Messaged Mr. Sangvi",
//       time: "5 minutes ago",
//     },
//   ];

//   return (
//     <div className="p-4">
//       <h3 className="font-Lato mb-4 font-bold text-[22px] text-cyanHover text-center">
//         Recent Activity
//       </h3>

//       <div className="flex flex-col gap-4">
//         {activities.map((item, index) => (
//           <div key={index} className="flex flex-row items-center gap-4">
//             <div className="h-[50px] w-[50px] bg-cyan flex items-center justify-center rounded-full">
//               {item.icon}
//             </div>

//             <div className="flex flex-col">
//               <span className="font-semibold text-[16px]">{item.title}</span>
//               <span className="text-gray-500 text-sm">{item.time}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Activity() {
  const activities = [
    {
      type: "call",
      icon: <FiPhoneCall className="text-[#1FA84B]" />,
      title: "Called Mr. Sangvi",
      time: "2 minutes ago",
    },
    {
      type: "message",
      icon: <HiOutlineChatBubbleLeftRight className="text-[#0AA3B8]" />,
      title: "Proposal send to Agro digital",
      time: "40 minutes ago",
    },
  ];

  return (
    <div
      className="
        bg-white
        w-full
        rounded-[8px]
        p-4 sm:p-5 lg:p-6
        lg:w-[380px] lg:h-[417px]
      "
    >
      {/* Title */}
      <h3 className="font-Lato font-bold text-[18px] sm:text-[22px] lg:text-[30px] text-[#1A1A1A] mb-4 lg:mb-8">
        Recent Activity
      </h3>

      <div className="flex flex-col gap-4 lg:gap-7">
        {activities.map((item, index) => (
          <div key={index} className="flex items-center gap-3 lg:gap-4">
            {/* Icon Circle */}
            <div
              className={`flex items-center justify-center rounded-full
                h-[34px] w-[34px] sm:h-[40px] sm:w-[40px] lg:h-[46px] lg:w-[46px]
                ${item.type === "call" ? "bg-[#DFF7E6]" : "bg-[#DDF7FF]"}
              `}
            >
              <span className="text-[18px] sm:text-[20px] lg:text-[22px]">
                {item.icon}
              </span>
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <span className="font-Lato font-medium text-[13px] sm:text-[16px] lg:text-[20px] text-[#555555] leading-tight">
                {item.title}
              </span>
              <span className="font-Lato text-[11px] sm:text-[13px] lg:text-[14px] text-[#9A9A9A] mt-1">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
