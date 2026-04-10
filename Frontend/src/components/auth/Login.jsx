// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Auth.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setTouched({ ...touched, [name]: true });

    const newErrors = {};
    if (!newFormData.email) newErrors.email = "Email is required";
    if (!newFormData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <p className="auth-error">{errors.email}</p>
          )}
        </div>

        <div className="auth-field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && (
            <p className="auth-error">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>

      <p className="auth-link">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>

      {/* 🔑 Forgot Password link */}
      <p className="auth-link">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}