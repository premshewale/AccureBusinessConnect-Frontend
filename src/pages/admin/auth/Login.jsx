import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/auth/loginAPI";
import { clearError, initializeAuth } from "../../../slices/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../../utils/toast";

import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import LoginBg from "../../../assets/images/LoginBg.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Restore session on mount
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Auto-redirect if authenticated (runs on mount AND when state changes)
  useEffect(() => {
    if (isAuthenticated && user?.roleName) {
      // All roles go to same 
      // board per your router
      navigate("/admin/dashboard", { replace: true }); // replace: true prevents history stack buildup
    }
  }, [isAuthenticated, user?.roleName, navigate]); // Proper deps: re-runs only on changes

  // Early return if already authenticated (prevents form render)
  if (isAuthenticated && user?.roleName) {
    return null; // Or a loading spinner; effect will handle redirect
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showError("Email and password cannot be empty!");
      return;
    }

    dispatch(clearError());
    const result = await dispatch(
      login({ email: trimmedEmail, password: trimmedPassword })
    );

    if (login.rejected.match(result)) {
      const backendMessage = result.payload?.message || error;
      let toastMessage = backendMessage;

      if (
        backendMessage ===
        "Validation failed: must be a well-formed email address"
      ) {
        toastMessage = "Please enter a valid email address!";
      } else if (
        backendMessage ===
        "Validation failed: must not be blank; must not be blank"
      ) {
        toastMessage = "Email and password cannot be empty!";
      } else if (
        backendMessage ===
        "Validation failed: must be a well-formed email address; must not be blank"
      ) {
        toastMessage = "Please enter a valid email address!";
      }

      showError(toastMessage);
      return; // Don't proceed
    }

    if (login.fulfilled.match(result)) {
      showSuccess("Login Successful!");
      // No manual navigate here—useEffect handles it when state updates
    }
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

          {error && (
            <p className="text-red-400 text-sm text-center mb-2">
              {typeof error === 'string' ? error : error?.message || "Invalid credentials"}
            </p>
          )}

          <form onSubmit={handleSubmit}>
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
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-base font-medium">
                Password
              </label>
              <div className="relative">
                <FaKey className="text-white absolute left-3 top-1/2 -translate-y-1/2 text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password here"
                  className="border-2 rounded-xl border-white bg-cyan placeholder:text-white p-2 pl-10 text-sm w-[432px] h-[52px]"
                  required
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-cyan font-semibold py-2 rounded-xl disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

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