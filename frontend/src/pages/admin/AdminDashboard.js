import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Admin.css";

// ── TOKEN HELPER — reads from jj_user ────────
export const getToken = () => {
  try {
    const u = localStorage.getItem("jj_user");
    return u ? JSON.parse(u).token : null;
  } catch { return null; }
};

// ── Sidebar ───────────────────────────────────
const sidebarLinks = [
  { to: "/admin", icon: <i className="fa-solid fa-house"></i>, label: "Dashboard" },
  { to: "/admin/users", icon: <i className="fa-solid fa-users"></i>, label: "Manage Users" },
  { to: "/admin/trips", icon: <i className="fa-solid fa-plane-up"></i>, label: "Manage Trips" },
  { to: "/admin/bookings", icon: <i className="fa-solid fa-clipboard-list"></i>, label: "Manage Bookings" },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="admin-sidebar">
      <p className="sidebar-label">Navigation</p>
      <nav className="sidebar-nav">
        {sidebarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-link ${pathname === link.to ? "active" : ""}`}
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="sidebar-divider" />
      <p className="sidebar-label">Site</p>
      <nav className="sidebar-nav">
        <Link to="/" className="sidebar-link">
          <span className="sidebar-icon"><i className="fa-solid fa-globe"></i></span>View Site
        </Link>
      </nav>
    </aside>
  );
};

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data?.users) return data.users;
  if (data?.trips) return data.trips;
  if (data?.bookings) return data.bookings;
  if (data?.data) return data.data;
  return [];
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: "—", trips: "—", bookings: "—", revenue: "—" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = getToken();  // ← fixed
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [uRes, tRes, bRes] = await Promise.all([
          fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/admin/users", { headers }),
          fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/trips", { headers }),
          fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/admin/bookings", { headers }),
        ]);
        const users = uRes.ok ? toArray(await uRes.json()) : [];
        const trips = tRes.ok ? toArray(await tRes.json()) : [];
        const bookings = bRes.ok ? toArray(await bRes.json()) : [];
        const revenue = bookings
          .filter((b) => b.status === "confirmed")
          .reduce((sum, b) => sum + Number(b.totalAmount || b.totalPrice || 0), 0);
        setStats({
          users: users.length,
          trips: trips.length,
          bookings: bookings.length,
          revenue: `₹${revenue.toLocaleString("en-IN")}`,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Users", value: stats.users, icon: <i className="fa-solid fa-users"></i>, color: "blue", link: "/admin/users" },
    { label: "Total Trips", value: stats.trips, icon: <i className="fa-solid fa-plane-up"></i>, color: "gold", link: "/admin/trips" },
    { label: "Total Bookings", value: stats.bookings, icon: <i className="fa-solid fa-clipboard-list"></i>, color: "green", link: "/admin/bookings" },
    { label: "Revenue", value: stats.revenue, icon: <i className="fa-solid fa-money-bill-wave"></i>, color: "purple", link: "/admin/bookings" },
  ];

  const quickActions = [
    { to: "/admin/users", icon: <i className="fa-solid fa-users"></i>, title: "Manage Users", desc: "View, search and remove registered users." },
    { to: "/admin/trips", icon: <i className="fa-solid fa-plane-up"></i>, title: "Manage Trips", desc: "Add, edit and delete travel packages." },
    { to: "/admin/bookings", icon: <i className="fa-solid fa-clipboard-list"></i>, title: "Manage Bookings", desc: "View all bookings and update their status." },
  ];

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back. Here's a live overview of TravelVista.</p>
        </div>
        <div className="stats-grid">
          {statCards.map((card) => (
            <Link key={card.label} to={card.link} style={{ textDecoration: "none" }}>
              <div className={`stat-card ${card.color}`}>
                <div className="stat-card-top">
                  <span className="stat-label">{card.label}</span>
                  <div className={`stat-icon ${card.color}`}>{card.icon}</div>
                </div>
                <div className="stat-value">
                  {loading ? <span style={{ fontSize: "1rem", color: "#94a3b8" }}>Loading…</span> : card.value}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="admin-page-header" style={{ marginBottom: 20, marginTop: 8 }}>
          <h1 style={{ fontSize: "1.3rem" }}>Quick Actions</h1>
        </div>
        <div className="admin-actions-grid">
          {quickActions.map((a) => (
            <Link key={a.to} to={a.to} className="action-card">
              <div className="action-card-icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;