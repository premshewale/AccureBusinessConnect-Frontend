import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import LoginBg from "../../../assets/images/LoginBg.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div>
        {/* Heading */}
        <h1 className="font-lato font-bold text-[48px] leading-[100%] tracking-[0px] text-center text-white">
          Accure Business <br /> Connect
        </h1>

        {/* Login Card */}
        <div className="bg-cyan w-[488px] h-[413px] border rounded-xl p-6 mt-4">
          <h2 className="text-white text-center font-lato-bold text-2xl">
            Admin login
          </h2>
          <p className="text-white text-center text-base mb-4">
            Enter your email address to sign in to your account
          </p>

          {/* Email Input */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-white text-base font-medium">Email</label>
            <div className="relative">
              <MdEmail className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2 mb-3">
            <label className="text-white text-base font-medium">Password</label>

            <div className="relative">
              <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
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

          {/* Remember Me */}
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-white">Remember me</span>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-white text-cyan font-semibold py-2 rounded-xl"
            onClick={() => navigate("/admin/dashboard")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
