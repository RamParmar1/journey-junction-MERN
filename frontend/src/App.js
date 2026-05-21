import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./assets/css/style.css"

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetails from "./pages/PackageDetails";
import Booking from "./pages/Booking";
import MyBooking from "./pages/MyBooking";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageTrips from "./pages/admin/ManageTrips";
import ManageBookings from "./pages/admin/ManageBookings";

// ✅ Import ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "78vh", padding: "12px" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
         

          {/* ✅ Protected User Routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ✅ Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trips"
            element={
              <ProtectedRoute>
                <ManageTrips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <ManageBookings />
              </ProtectedRoute>
            }
          />
          
          {/* ✅ SYNTAX ERROR FIXED HERE: Comment was breaking the code */}
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;