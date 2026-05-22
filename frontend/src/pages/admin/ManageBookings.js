import React, { useEffect, useState } from "react";
import { Sidebar, getToken } from "./AdminDashboard";
import "./Admin.css";

// Smart status options based on current status
function getStatusOptions(current) {
  if (current === "pending") return ["pending", "confirmed", "cancelled"];
  if (current === "confirmed") return ["confirmed", "cancelled"]; // pending nahi ja sakta
  if (current === "cancelled") return ["cancelled"]; // locked
  return ["pending", "confirmed", "cancelled"];
}

function DeleteModal({ onConfirm, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "1rem"
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "2.5rem 2rem",
        maxWidth: "400px", width: "100%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}><i className="fa-solid fa-trash-can"></i></div>
        <h2 style={{ color: "#1a1a2e", fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Delete Booking?
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Ye booking permanently delete ho jayegi!
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "0.8rem", borderRadius: "10px",
            border: "2px solid #e0e0e0", background: "#fff",
            fontSize: "0.95rem", fontWeight: "600", cursor: "pointer", color: "#555"
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "0.8rem", borderRadius: "10px",
            border: "none", background: "linear-gradient(135deg, #e74c3c, #c0392b)",
            fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", color: "#fff"
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const fetchBookings = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + "/admin/bookings", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch { setError("Could not load bookings."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/admin/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.map((b) => b._id === id ? { ...b, status: newStatus } : b));
    } catch { setError("Failed to update status."); }
    finally { setUpdating(null); }
  };

  const handleDelete = async () => {
    setDeleting(deleteId);
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/admin/bookings/${deleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      setBookings((prev) => prev.filter((b) => b._id !== deleteId));
      setDeleteId(null);
    } catch { setError("Failed to delete booking."); }
    finally { setDeleting(null); }
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === "all" || b.status === filter;
    const term = search.toLowerCase();
    const matchSearch = !search ||
      b.user?.name?.toLowerCase().includes(term) ||
      b.user?.email?.toLowerCase().includes(term) ||
      b.package?.name?.toLowerCase().includes(term) ||
      b.package?.title?.toLowerCase().includes(term);
    return matchFilter && matchSearch;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        {deleteId && (
          <DeleteModal
            onConfirm={handleDelete}
            onClose={() => setDeleteId(null)}
          />
        )}

        <div className="admin-page-header">
          <h1>Manage Bookings</h1>
          <p>{bookings.length} total booking{bookings.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Filter cards */}
        <div className="stats-grid" style={{ marginBottom: 28 }}>
          {[
            { label: "Total", key: "all", color: "blue", icon: <i className="fa-solid fa-clipboard-list"></i> },
            { label: "Pending", key: "pending", color: "gold", icon: <i className="fa-solid fa-hourglass-half"></i> },
            { label: "Confirmed", key: "confirmed", color: "green", icon: <i className="fa-solid fa-circle-check"></i> },
            { label: "Cancelled", key: "cancelled", color: "purple", icon: <i className="fa-solid fa-circle-xmark"></i> },
          ].map((s) => (
            <div
              key={s.key}
              className={`stat-card ${s.color}`}
              style={{ cursor: "pointer", outline: filter === s.key ? "2px solid #c9a84c" : "none" }}
              onClick={() => setFilter(s.key)}
            >
              <div className="stat-card-top">
                <span className="stat-label">{s.label}</span>
                <div className={`stat-icon ${s.color}`}>{s.icon}</div>
              </div>
              <div className="stat-value">{loading ? "—" : counts[s.key]}</div>
              <div className="stat-change">Click to filter</div>
            </div>
          ))}
        </div>

        <div className="admin-table-section">
          <div className="table-header">
            <h2>{filter === "all" ? "All Bookings" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Bookings`}</h2>
            <div className="table-search">
              <input type="text" placeholder="Search user or trip…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {error && <div className="admin-empty"><div className="empty-icon"><i className="fa-solid fa-triangle-exclamation"></i></div><p style={{ color: "#dc2626" }}>{error}</p><button className="btn-admin-primary" onClick={fetchBookings}>Retry</button></div>}
          {loading && <div className="admin-empty"><div className="empty-icon"><i className="fa-solid fa-hourglass-half"></i></div><p>Loading bookings…</p></div>}
          {!loading && !error && filtered.length === 0 && <div className="admin-empty"><div className="empty-icon"><i className="fa-solid fa-clipboard-list"></i></div><p>No bookings found.</p></div>}

          {!loading && !error && filtered.length > 0 && (
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>User</th><th>Package</th><th>Travelers</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => {
                  const isCancelled = b.status === "cancelled";
                  const statusOptions = getStatusOptions(b.status);
                  return (
                    <tr key={b._id}>
                      <td className="muted" data-label="#">{i + 1}</td>
                      <td data-label="User">
                        <strong>{b.user?.name || "—"}</strong>
                        {b.user?.email && <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{b.user.email}</div>}
                      </td>
                      <td data-label="Package">{b.package?.name || b.package?.title || "—"}</td>
                      <td className="muted" data-label="Travelers">{b.travelers || 1}</td>
                      <td data-label="Amount"><strong style={{ color: "#c9a84c" }}>₹{Number(b.totalAmount || 0).toLocaleString("en-IN")}</strong></td>
                      <td className="muted" data-label="Date">{b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                      <td data-label="Status">
                        <select
                          value={b.status}
                          disabled={updating === b._id || isCancelled}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          style={{
                            padding: "4px 10px", borderRadius: 6,
                            border: "1.5px solid #dce5f0",
                            fontSize: "0.78rem", fontWeight: 600,
                            background: isCancelled ? "#fee2e2" : "#f8fafc",
                            cursor: isCancelled ? "not-allowed" : "pointer",
                            color: b.status === "confirmed" ? "#065f46" : b.status === "cancelled" ? "#991b1b" : "#92400e",
                            opacity: updating === b._id ? 0.6 : 1
                          }}
                        >
                          {statusOptions.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                        {isCancelled && (
                          <div style={{ fontSize: "0.7rem", color: "#991b1b", marginTop: "3px" }}><i className="fa-solid fa-lock"></i> Locked</div>
                        )}
                      </td>
                      <td data-label="Actions">
                        <div className="admin-table-actions">
                          <button
                            className="btn-table-delete"
                            onClick={() => setDeleteId(b._id)}
                            disabled={deleting === b._id}
                          >
                            {deleting === b._id ? "…" : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}