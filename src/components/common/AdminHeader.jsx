// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { IoSearchSharp } from "react-icons/io5";
// import { CiBellOn } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
// import { FaRegUserCircle } from "react-icons/fa";
// import { HiOutlineBars4 } from "react-icons/hi2";

// import Notification from "./Notification";
// import { logoutUser } from "../../services/auth/logoutAPI";

// export default function AdminHeader({ setSidebarOpen }) {
//   const [openPlus, setOpenPlus] = useState(false);
//   const [openBell, setOpenBell] = useState(false);
//   const [openUser, setOpenUser] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const plusRef = useRef(null);
//   const bellRef = useRef(null);
//   const userRef = useRef(null);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (plusRef.current && !plusRef.current.contains(event.target)) {
//         setOpenPlus(false);
//       }
//       if (bellRef.current && !bellRef.current.contains(event.target)) {
//         setOpenBell(false);
//       }
//       if (userRef.current && !userRef.current.contains(event.target)) {
//         setOpenUser(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ✅ Proper logout handler
//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/admin/login", { replace: true });
//   };

//   return (
//     <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between h-[75px] drop-shadow-md">
//       <HiOutlineBars4
//         className="text-cyan text-3xl cursor-pointer md:hidden"
//         onClick={() => setSidebarOpen(true)}
//       />

//       {/* Left Section */}
//       <div className="flex items-center gap-4 ml-8">
//         {/* Search */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search leads contacts deals......"
//             className="border border-gray-300 rounded-sm pl-10 pr-4 w-[541px] h-[40px]
//                        focus:outline-none focus:ring-2 focus:ring-blue-100
//                        placeholder:text-[#919191]"
//           />
//           <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
//         </div>

//         {/* Plus Dropdown */}
//         <div className="relative" ref={plusRef}>
//           <FaPlus
//             className={`text-cyan text-2xl cursor-pointer w-[22px] h-[22px] transition-transform duration-300 ${
//               openPlus ? "rotate-90" : "rotate-0"
//             }`}
//             onClick={() => setOpenPlus((prev) => !prev)}
//           />
//           {openPlus && (
//             <div className="absolute right-0 mt-2 w-48 bg-cyan text-white shadow-lg rounded-md border z-50">
//               <ul className="py-2">
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Lead
//                 </li>
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Contact
//                 </li>
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Deal
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center">
//         {/* Bell */}
//         <div className="relative" ref={bellRef}>
//           <CiBellOn
//             className="text-cyan text-2xl cursor-pointer mr-4"
//             onClick={() => setOpenBell((prev) => !prev)}
//           />
//           {openBell && (
//             <div className="absolute right-0 mt-2 z-50">
//               <Notification />
//             </div>
//           )}
//         </div>

//         {/* User */}
//         <div className="relative" ref={userRef}>
//           <FaRegUserCircle
//             className="text-cyan text-2xl cursor-pointer ml-4 mr-12"
//             onClick={() => setOpenUser((prev) => !prev)}
//           />
//           {openUser && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
//               <ul className="py-2">
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     navigate("/admin/profile");
//                     setOpenUser(false); // close dropdown after click
//                   }}
//                 >
//                   My Profile
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { IoSearchSharp } from "react-icons/io5";
// import { CiBellOn } from "react-icons/ci";
// import { FaPlus } from "react-icons/fa6";
// import { FaRegUserCircle } from "react-icons/fa";
// import { HiOutlineBars4 } from "react-icons/hi2";

// import Notification from "./Notification";
// import { logoutUser } from "../../services/auth/logoutAPI";

// export default function AdminHeader({ setSidebarOpen }) {
//   const [openPlus, setOpenPlus] = useState(false);
//   const [openBell, setOpenBell] = useState(false);
//   const [openUser, setOpenUser] = useState(false);

//   // ✅ Mobile search open/close
//   const [openSearch, setOpenSearch] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const plusRef = useRef(null);
//   const bellRef = useRef(null);
//   const userRef = useRef(null);
//   const searchRef = useRef(null);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (plusRef.current && !plusRef.current.contains(event.target)) {
//         setOpenPlus(false);
//       }
//       if (bellRef.current && !bellRef.current.contains(event.target)) {
//         setOpenBell(false);
//       }
//       if (userRef.current && !userRef.current.contains(event.target)) {
//         setOpenUser(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setOpenSearch(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // logout
//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/admin/login", { replace: true });
//   };

//   return (
//     <div
//       className="
//         w-full lg:w-[1190px]
//         h-[70px] lg:h-[75px]
//         bg-white border border-[#EAEAEA]
//         px-4 sm:px-6
//         flex items-center justify-between
//         relative
//       "
//     >
//       {/* Left Section */}
//       <div className="flex items-center gap-3 sm:gap-4">
//         {/* Sidebar icon (mobile only) */}
//         <HiOutlineBars4
//           className="text-cyan text-3xl cursor-pointer lg:hidden"
//           onClick={() => setSidebarOpen(true)}
//         />

//         {/* Search (desktop only) */}
//         <div className="relative hidden lg:block">
//           <input
//             type="text"
//             placeholder="Search leads contacts deals......"
//             className="border border-gray-300 rounded-sm pl-10 pr-4 w-[541px] h-[40px]
//                        focus:outline-none focus:ring-2 focus:ring-blue-100
//                        placeholder:text-[#919191]"
//           />
//           <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
//         </div>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-4 sm:gap-6">
//         {/* ✅ Search icon (mobile only) */}
//         <div className="relative lg:hidden" ref={searchRef}>
//           <IoSearchSharp
//             className="text-cyan text-[26px] cursor-pointer"
//             onClick={() => setOpenSearch((prev) => !prev)}
//           />

//           {/* ✅ Mobile Search Input Popup */}
//           {openSearch && (
//             <div className="absolute right-0 top-[45px] w-[260px] bg-white border border-[#EAEAEA] shadow-md rounded-md p-2 z-50">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-full border border-gray-300 rounded-sm pl-10 pr-3 h-[38px]
//                              focus:outline-none focus:ring-2 focus:ring-blue-100
//                              placeholder:text-[#919191]"
//                 />
//                 <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Plus Dropdown */}
//         <div className="relative" ref={plusRef}>
//           <FaPlus
//             className={`text-cyan cursor-pointer w-[22px] h-[22px] transition-transform duration-300 ${
//               openPlus ? "rotate-90" : "rotate-0"
//             }`}
//             onClick={() => setOpenPlus((prev) => !prev)}
//           />
//           {openPlus && (
//             <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-cyan text-white shadow-lg rounded-md border z-50">
//               <ul className="py-2">
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Lead
//                 </li>
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Contact
//                 </li>
//                 <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
//                   Add Deal
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Bell */}
//         <div className="relative" ref={bellRef}>
//           <CiBellOn
//             className="text-cyan text-[26px] cursor-pointer"
//             onClick={() => setOpenBell((prev) => !prev)}
//           />
//           {openBell && (
//             <div className="absolute right-0 mt-2 z-50">
//               <Notification />
//             </div>
//           )}
//         </div>

//         {/* User */}
//         <div className="relative" ref={userRef}>
//           <FaRegUserCircle
//             className="text-cyan text-[26px] cursor-pointer"
//             onClick={() => setOpenUser((prev) => !prev)}
//           />
//           {openUser && (
//             <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
//               <ul className="py-2">
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => {
//                     navigate("/admin/profile");
//                     setOpenUser(false);
//                   }}
//                 >
//                   My Profile
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IoSearchSharp } from "react-icons/io5";
import { CiBellOn } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBars4 } from "react-icons/hi2";

import Notification from "./Notification";
import { logoutUser } from "../../services/auth/logoutAPI";

export default function AdminHeader({ setSidebarOpen }) {
  const [openPlus, setOpenPlus] = useState(false);
  const [openBell, setOpenBell] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const plusRef = useRef(null);
  const bellRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdowns + search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (plusRef.current && !plusRef.current.contains(event.target)) {
        setOpenPlus(false);
      }
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpenBell(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpenUser(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (openSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [openSearch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="w-full h-[75px] bg-white border border-[#EAEAEA] px-4 sm:px-6 flex items-center justify-between relative">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Icon */}
        <HiOutlineBars4
          className="text-cyan text-3xl cursor-pointer md:hidden"
          onClick={() => setSidebarOpen(true)}
        />

        {/* Desktop Search */}
        <div className="hidden md:block relative ml-6">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search leads contacts deals......"
            className="border border-gray-300 rounded-sm pl-10 pr-4 w-[541px] h-[40px]
                       focus:outline-none focus:ring-2 focus:ring-blue-100
                       placeholder:text-[#919191]"
          />
          <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon */}
        <button
          type="button"
          className="md:hidden text-cyan text-xl"
          onClick={() => setOpenSearch((prev) => !prev)}
        >
          <IoSearchSharp />
        </button>

        {/* Plus Dropdown */}
        <div className="relative" ref={plusRef}>
          <FaPlus
            className={`text-cyan text-xl cursor-pointer transition-transform duration-300 ${
              openPlus ? "rotate-90" : "rotate-0"
            }`}
            onClick={() => setOpenPlus((prev) => !prev)}
          />

          {openPlus && (
            <div className="absolute right-0 mt-2 w-44 bg-cyan text-white shadow-lg rounded-md border z-50">
              <ul className="py-2 text-sm">
                <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
                  Add Lead
                </li>
                <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
                  Add Contact
                </li>
                <li className="px-4 py-2 hover:bg-[#1E1E1E66] cursor-pointer">
                  Add Deal
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Bell */}
        <div className="relative" ref={bellRef}>
          <CiBellOn
            className="text-cyan text-2xl cursor-pointer"
            onClick={() => setOpenBell((prev) => !prev)}
          />
          {openBell && (
            <div className="absolute right-0 mt-2 z-50">
              <Notification />
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative" ref={userRef}>
          <FaRegUserCircle
            className="text-cyan text-2xl cursor-pointer"
            onClick={() => setOpenUser((prev) => !prev)}
          />
          {openUser && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/admin/profile");
                    setOpenUser(false);
                  }}
                >
                  My Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile Search Input (Dropdown) */}
      {openSearch && (
        <div
          ref={searchRef}
          className="md:hidden absolute top-[75px] left-0 w-full bg-white border-t border-[#EAEAEA] px-4 py-3 z-50"
        >
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search leads contacts deals......"
              className="w-full border border-gray-300 rounded-sm pl-10 pr-4 h-[40px]
                         focus:outline-none focus:ring-2 focus:ring-blue-100
                         placeholder:text-[#919191]"
            />
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-[#919191]" />
          </div>
        </div>
      )}
    </div>
  );
}
