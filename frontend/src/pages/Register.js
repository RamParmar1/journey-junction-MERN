import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import api from "../api";
import { register } from '../api';
import { useAuth } from "../AuthContext";


export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
     // const res = await api.post("/users", {
     const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Auto login after registration
      login(res.data);
      navigate("/"); // redirect home
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h1>User Registration</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="cpassword">Confirm Password:</label>
        <input
          type="password"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          required
        />

        <button id="btn" type="submit" className="register-btn">Register</button>
      </form>

      <div className="switch-link">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
}
