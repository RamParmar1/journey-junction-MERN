import React, { useEffect, useState } from "react";
import { Sidebar, getToken } from "./AdminDashboard";
import "./Admin.css";

const EMPTY_FORM = { name: "", location: "", price: "", duration: "", description: "", image: "", maxGroupSize: "" };

export default function ManageTrips() {
  const [trips, setTrips]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editId, setEditId]       = useState(null);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(null);
  const [search, setSearch]       = useState("");
  const [formError, setFormError] = useState("");

  const fetchTrips = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + "/trips", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTrips(Array.isArray(data) ? data : data.trips || []);
    } catch { setError("Could not load trips."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTrips(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setFormError("");
    if (!form.name || !form.location || !form.price) { setFormError("Name, location and price are required."); return; }
    setSaving(true);
    try {
      const url    = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + (editId ? `/admin/trips/${editId}` : '/admin/trips');
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      if (!res.ok) throw new Error();
      setShowForm(false); setForm(EMPTY_FORM); setEditId(null);
      fetchTrips();
    } catch { setFormError("Failed to save trip."); }
    finally { setSaving(false); }
  };

  const handleEdit = (trip) => {
    setForm({ name: trip.name||"", location: trip.location||"", price: trip.price||"", duration: trip.duration||"", description: trip.description||"", image: trip.image||"", maxGroupSize: trip.maxGroupSize||"" });
    setEditId(trip._id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    setDeleting(id);
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/admin/trips/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error();
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch { alert("Failed to delete trip."); }
    finally { setDeleting(null); }
  };

  const filtered = trips.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-page-header">
          <h1>Manage Trips</h1>
          <p>{trips.length} trip package{trips.length !== 1 ? "s" : ""} listed</p>
        </div>

        {showForm && (
          <div className="admin-form-card">
            <h2>{editId ? "✏️ Edit Trip" : "➕ Add New Trip"}</h2>
            {formError && <p className="error" style={{ marginBottom: 16 }}>{formError}</p>}
            <form onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-form-group"><label>Trip Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Goa Getaway" /></div>
                <div className="admin-form-group"><label>Location *</label><input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Goa" /></div>
                <div className="admin-form-group"><label>Price (₹) *</label><input name="price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 14999" /></div>
                <div className="admin-form-group"><label>Duration</label><input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 5 Days / 4 Nights" /></div>
                <div className="admin-form-group"><label>Max Group Size</label><input name="maxGroupSize" type="number" value={form.maxGroupSize} onChange={handleChange} placeholder="e.g. 12" /></div>
                <div className="admin-form-group"><label>Image URL</label><input name="image" value={form.image} onChange={handleChange} placeholder="https://..." /></div>
                <div className="admin-form-group full-width"><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} placeholder="Trip description…" /></div>
              </div>
              <div className="admin-form-actions">
                <button type="submit" className="btn-admin-primary" disabled={saving}>{saving ? "Saving…" : editId ? "Update Trip" : "Add Trip"}</button>
                <button type="button" className="btn-admin-secondary" onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-table-section">
          <div className="table-header">
            <h2>All Trips</h2>
            <div className="table-search" style={{ display: "flex", gap: 10 }}>
              <input type="text" placeholder="Search trips…" value={search} onChange={(e) => setSearch(e.target.value)} />
              {!showForm && <button className="btn-admin-primary" onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}>+ Add Trip</button>}
            </div>
          </div>
          {loading && <div className="admin-empty"><div className="empty-icon">⏳</div><p>Loading trips…</p></div>}
          {error   && <div className="admin-empty"><div className="empty-icon">⚠️</div><p style={{ color: "#dc2626" }}>{error}</p><button className="btn-admin-primary" onClick={fetchTrips}>Retry</button></div>}
          {!loading && !error && filtered.length === 0 && <div className="admin-empty"><div className="empty-icon">✈️</div><p>No trips found. Add one above!</p></div>}
          {!loading && !error && filtered.length > 0 && (
            <table className="admin-table">
              <thead><tr><th>#</th><th>Name</th><th>Location</th><th>Price</th><th>Duration</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map((trip, i) => (
                  <tr key={trip._id}>
                    <td className="muted" data-label="#">{i + 1}</td>
                    <td data-label="Name"><strong>{trip.name}</strong></td>
                    <td className="muted" data-label="Location">{trip.location}</td>
                    <td data-label="Price"><strong style={{ color: "#c9a84c" }}>₹{Number(trip.price).toLocaleString("en-IN")}</strong></td>
                    <td className="muted" data-label="Duration">{trip.duration || "—"}</td>
                    <td data-label="Actions">
                      <div className="admin-table-actions">
                        <button className="btn-table-edit" onClick={() => handleEdit(trip)}>Edit</button>
                        <button className="btn-table-delete" onClick={() => handleDelete(trip._id)} disabled={deleting === trip._id}>{deleting === trip._id ? "…" : "Delete"}</button>
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