import { useState, useEffect } from "react";
import "./MyBooking.css";

// Cancel Confirm Modal
function CancelModal({ onConfirm, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "1rem"
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "2.5rem 2rem",
        maxWidth: "420px", width: "100%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>😢</div>
        <h2 style={{ color: "#1a1a2e", fontSize: "1.4rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Cancel Booking?
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
          Kya aap sach mein ye booking cancel karna chahte hain? Ye action undo nahi ho sakti!
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "0.85rem", borderRadius: "10px",
            border: "2px solid #e0e0e0", background: "#fff",
            fontSize: "0.95rem", fontWeight: "600", cursor: "pointer", color: "#555"
          }}>
            Nahi, Rakho
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "0.85rem", borderRadius: "10px",
            border: "none", background: "linear-gradient(135deg, #e74c3c, #c0392b)",
            fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", color: "#fff"
          }}>
            Haan, Cancel Karo
          </button>
        </div>
      </div>
    </div>
  );
}

// Success Toast
function SuccessToast({ message }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem",
      background: "#1a1a2e", color: "#d4af37",
      padding: "1rem 1.5rem", borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      fontWeight: "600", fontSize: "0.95rem", zIndex: 9999,
      display: "flex", alignItems: "center", gap: "0.5rem"
    }}>
      ✅ {message}
    </div>
  );
}

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelId, setCancelId] = useState(null);
  const [toast, setToast] = useState("");

  const getToken = () => {
    const stored = localStorage.getItem("jj_user");
    return stored ? JSON.parse(stored)?.token : null;
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + "/bookings/mybookings", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.bookings || []);
    } catch (err) {
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async () => {
    try {
      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/bookings/${cancelId}/cancel`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error("Cancel failed");
      setCancelId(null);
      setToast("Booking successfully cancelled!");
      setTimeout(() => setToast(""), 3000);
      fetchBookings();
    } catch (err) {
      setError("Failed to cancel booking");
      setCancelId(null);
    }
  };

  if (loading) return <div className="container">Loading your bookings...</div>;
  if (error) return <div className="container alert alert-danger">{error}</div>;

  return (
    <div className="container">
      {cancelId && (
        <CancelModal
          onConfirm={handleCancel}
          onClose={() => setCancelId(null)}
        />
      )}
      {toast && <SuccessToast message={toast} />}

      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You don't have any bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h5>{booking.package?.name || booking.package?.title || "Trip"}</h5>
                    <p><strong>Location:</strong> {booking.package?.location}</p>
                    <p><strong>Travelers:</strong> {booking.travelers}</p>
                    <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><strong>Total Amount:</strong> ₹{booking.totalAmount || (booking.package?.price * booking.travelers)}</p>
                    <p>
                      <strong>Status: </strong>
                      <span className={`status ${booking.status}`}>{booking.status}</span>
                    </p>
                  </div>
                  <div className="col-md-4 text-right">
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => setCancelId(booking._id)}
                        style={{
                          background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                          color: "#fff", border: "none", borderRadius: "8px",
                          padding: "0.5rem 1rem", fontSize: "0.85rem",
                          fontWeight: "600", cursor: "pointer",
                          transition: "opacity 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;