import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaKey } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ResetBg from "../../../assets/images/LoginBg.png";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams(); // get token from URL

  const handleReset = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Call API with token and new password
    console.log("Reset password with token:", token, password);
    alert("Password reset successful!");
    navigate("/admin/login");
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${ResetBg})` }}
    >
      <div className="bg-cyan w-full max-w-md rounded-xl p-6 mt-4 border">
        <h2 className="text-white text-center font-bold text-2xl mb-4">
          Reset Password
        </h2>

        {/* New Password */}
        <div className="flex flex-col gap-2 mb-3">
          <label className="text-white text-base font-medium">New Password</label>
          <div className="relative">
            <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-full h-[52px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-white text-base font-medium">Confirm Password</label>
          <div className="relative">
            <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-full h-[52px]"
            />
          </div>
        </div>

        <button
          className="w-full bg-white text-cyan font-semibold py-2 rounded-xl"
          onClick={handleReset}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
