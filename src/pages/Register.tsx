/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setUser } from "../features/auth/authSlice";
import { api } from "../services/api";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [currentStep, setCurrentStep] = useState<"FORM" | "OTP">("FORM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/request-otp", { email,password });
      toast.success("OTP sent to your email");
      setCurrentStep("OTP");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/verify-otp", {
        name,
        email,
        password,
        otp,
      });

      dispatch(setUser(response.data)); // ✅ Set user in Redux
      toast.success("Account created successfully!");
      navigate("/dashboard"); // ✅ Then navigate
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "OTP verification failed.");
    }
  };

  const handleSubmit =
    currentStep === "FORM" ? handleInitialSubmit : handleVerifyOtpAndRegister;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {currentStep === "FORM" && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </>
      )}

      {currentStep === "OTP" && (
        <>
          <p>
            Enter the OTP sent to <strong>{email}</strong>
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </>
      )}

      <button type="submit">
        {currentStep === "FORM" ? "Send OTP" : "Verify & Register"}
      </button>

      <div
        style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}
      >
        <p>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--primary-color)" }}>
            Login
          </Link>
        </p>
        <p>
          <Link to="/forgot-password" style={{ color: "var(--primary-color)" }}>
            Forgot password?
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
