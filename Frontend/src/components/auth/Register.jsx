import React, { useState } from "react";
import { validateRegisterForm } from "../../validation/registerValidation"; // ✅ regex validator
import { Link, useNavigate } from "react-router-dom";
import "../../style/Auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setTouched({ ...touched, [name]: true });

    // ✅ Run regex validation on every change
    const newErrors = validateRegisterForm(newFormData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate before submit
    const newErrors = validateRegisterForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful!");
      console.log("User registered:", data);

      // ✅ Redirect to login after success
      navigate("/login");
    } catch (err) {
      console.error("Error registering:", err);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {touched.username && errors.username && (
            <p style={{ color: "red" }}>{errors.username}</p>
          )}
        </div>

        <div className="auth-field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
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
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        <button type="submit" className="auth-button">Register</button>

        <p style={{ marginTop: "1rem" }} className="auth-link">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}
