import React, { useEffect, useState } from "react";
import { Sidebar, getToken } from "./AdminDashboard";
import "./Admin.css";

export default function ManageUsers() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchUsers = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + "/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },  // ← fixed
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (err) {
      setError("Could not load users. Check your API connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    setDeleting(id);
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Failed to delete user.");
    } finally { setDeleting(null); }
  };

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <h1>Manage Users</h1>
          <p>{users.length} registered user{users.length !== 1 ? "s" : ""} on TravelVista</p>
        </div>
        <div className="admin-table-section">
          <div className="table-header">
            <h2>All Users</h2>
            <div className="table-search">
              <input type="text" placeholder="Search by name or email…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          {loading && <div className="admin-empty"><div className="empty-icon">⏳</div><p>Loading users…</p></div>}
          {error   && <div className="admin-empty"><div className="empty-icon">⚠️</div><p style={{ color: "#dc2626" }}>{error}</p><button className="btn-admin-primary" onClick={fetchUsers}>Retry</button></div>}
          {!loading && !error && filtered.length === 0 && <div className="admin-empty"><div className="empty-icon">👥</div><p>No users found.</p></div>}
          {!loading && !error && filtered.length > 0 && (
            <table className="admin-table">
              <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((user, i) => (
                  <tr key={user._id}>
                    <td className="muted" data-label="#">{i + 1}</td>
                    <td data-label="Name"><strong>{user.name || "—"}</strong></td>
                    <td className="muted" data-label="Email">{user.email}</td>
                    <td data-label="Role"><span className={`badge ${user.isAdmin || user.role === "admin" ? "admin-role" : "active"}`}>{user.isAdmin || user.role === "admin" ? "admin" : "user"}</span></td>
                    <td className="muted" data-label="Joined">{user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                    <td data-label="Actions">
                      <div className="admin-table-actions">
                        <button className="btn-table-delete" onClick={() => handleDelete(user._id)} disabled={deleting === user._id}>{deleting === user._id ? "Deleting…" : "Delete"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}