/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { toast } from "react-toastify";
import { unwrapResult } from "@reduxjs/toolkit";
import { loginUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const action = await dispatch(loginUser({ email, password }));
      unwrapResult(action);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <div
        style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem" }}
      >
        <p>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "var(--primary-color)" }}>
            Register
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

export default Login;
