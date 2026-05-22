import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from '../api';
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const pw = formData.password;
    if (pw.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (pw.includes("_")) {
      toast.error("Password cannot contain an underscore (_).");
      return;
    }
    const numbers = pw.replace(/[^0-9]/g, "").length;
    if (numbers < 2) {
      toast.error("Password must contain at least 2 numbers.");
      return;
    }
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>\-\/=\+\[\]]/.test(pw);
    if (!hasSymbol) {
      toast.error("Password must contain at least one special symbol (e.g., @, #, $).");
      return;
    }

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Auto login after registration
      login(res.data);
      toast.success("Registration successful! Welcome to Journey Junction.");
      navigate("/"); // redirect home
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>User Registration</h1>

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
