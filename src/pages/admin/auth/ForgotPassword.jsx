import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import ForgotBg from "../../../assets/images/LoginBg.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Call your API to send reset link
    console.log("Send reset link to:", email);
    alert("If this email exists, a reset link will be sent.");
    navigate("/admin/reset-password"); // Redirect after submission
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${ForgotBg})` }}
    >
      <div className="bg-cyan w-full max-w-md border rounded-xl p-6 mt-4  ">
        <h2 className="text-white text-center font-bold text-2xl mb-4">
          Forgot Password
        </h2>
        <p className="text-white text-center mb-6">
          Enter your email to receive a password reset link
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-white text-base font-medium">Email</label>
          <div className="relative">
            <MdEmail className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-full h-[52px]"
            />
          </div>
        </div>

        <button
          className="w-full bg-white text-cyan font-semibold py-2 rounded-xl mb-2"
          onClick={handleSubmit}
        >
          Send Reset Link
        </button>

        <button
          className="w-full text-white text-sm underline"
          onClick={() => navigate("/admin/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
