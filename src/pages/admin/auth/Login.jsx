import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../api/auth/loginUser";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../../utils/toast";

import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import LoginBg from "../../../assets/images/LoginBg.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
      navigate("/admin/dashboard");

    // const result = await dispatch(loginUser({ email, password }));
    // if (loginUser.rejected.match(result)) {
    //   const backendMessage = result.payload?.message;

    //   let toastMessage = backendMessage;

    //   // Map backend messages to friendly custom messages
    //   if (
    //     backendMessage ===
    //     "Validation failed: must be a well-formed email address"
    //   ) {
    //     toastMessage = "Please enter a valid email address!";
    //   } else if (
    //     backendMessage ===
    //     "Validation failed: must not be blank; must not be blank"
    //   ) {
    //     toastMessage = "Email and password cannot be empty!";
    //   } else if (
    //     backendMessage ===
    //     "Validation failed: must be a well-formed email address; must not be blank"
    //   ) {
    //     toastMessage = "Please enter a valid email address!";
    //   }
   
    //   showError(toastMessage);
    // }
      // navigate("/admin/dashboard");

    // if (loginUser.fulfilled.match(result)) {
    //   showSuccess("Login Successful!");
    //   navigate("/admin/dashboard");
    // }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div>
        <h1 className="font-lato font-bold text-[48px] leading-[100%] tracking-[0px] text-center text-white">
          Accure Business <br /> Connect
        </h1>

        <div className="bg-cyan w-[488px] border rounded-xl p-6 mt-4">
          <h2 className="text-white text-center font-lato-bold text-2xl">
            Admin login
          </h2>

          <p className="text-white text-center text-base mb-4">
            Enter your email address to sign in
          </p>

          {/* Email */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-white text-base font-medium">Email</label>
            <div className="relative">
              <MdEmail className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-white text-base font-medium">Password</label>

            <div className="relative">
              <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password here"
                className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg"
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm text-center mb-2">
              {error.message || "Invalid credentials"}
            </p>
          )}

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full bg-white text-cyan font-semibold py-2 rounded-xl"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <span
            className="text-white text-sm text-right ml-auto block cursor-pointer underline mt-2"
            onClick={() => navigate("/admin/forgot-password")}
          >
            Forgot/Reset Password?
          </span>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import { MdEmail } from "react-icons/md";
// import { FaKey } from "react-icons/fa6";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import LoginBg from "../../../assets/images/LoginBg.png";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.post(
//         "https://backend.abc.techsofast.com/api/auth/login",
//         { email, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("Login response:", response.data);

//       if (response.data.token) {
//         localStorage.setItem("token_admin", response.data.token);
//         navigate("/admin/dashboard");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Network error or CORS issue");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
//       style={{ backgroundImage: `url(${LoginBg})` }}
//     >
//       <div>
//         <h1 className="font-lato font-bold text-[48px] leading-[100%] tracking-[0px] text-center text-white">
//           Accure Business <br /> Connect
//         </h1>

//         <div className="bg-cyan w-[488px] border rounded-xl p-6 mt-4">
//           <h2 className="text-white text-center font-lato-bold text-2xl">
//             Admin login
//           </h2>

//           <p className="text-white text-center text-base mb-4">
//             Enter your email address to sign in
//           </p>

//           {/* Email */}
//           <div className="flex flex-col gap-2 mb-3">
//             <label className="text-white text-base font-medium">Email</label>
//             <div className="relative">
//               <MdEmail className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="flex flex-col gap-2 mb-3">
//             <label className="text-white text-base font-medium">Password</label>

//             <div className="relative">
//               <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password here"
//                 className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg"
//               >
//                 {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
//               </button>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-red-400 text-sm text-center mb-2">{error}</p>
//           )}

//           {/* Login Button */}
//           <button
//             disabled={loading}
//             className="w-full bg-white text-cyan font-semibold py-2 rounded-xl"
//             onClick={handleLogin}
//           >
//             {loading ? "Logging in..." : "Log In"}
//           </button>

//           <span
//             className="text-white text-sm text-right ml-auto block cursor-pointer underline mt-2"
//             onClick={() => navigate("/admin/forgot-password")}
//           >
//             Forgot/Reset Password?
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
