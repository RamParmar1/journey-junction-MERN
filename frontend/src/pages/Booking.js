import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Booking.css";

function SuccessModal({ trip, travelers, total, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "1rem"
    }}>
      <div style={{
        background: "#fff", borderRadius: "20px", padding: "3rem 2.5rem",
        maxWidth: "460px", width: "100%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ color: "#1a1a2e", fontSize: "1.6rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Booking Confirmed!
        </h2>
        <p style={{ color: "#666", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          Your trip has been successfully booked. Get ready for an amazing adventure!
        </p>
        <div style={{
          background: "#f8f9fa", borderRadius: "12px", padding: "1.25rem",
          marginBottom: "1.5rem", textAlign: "left"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "#888", fontSize: "0.9rem" }}>Trip</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{trip}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "#888", fontSize: "0.9rem" }}>Travelers</span>
            <span style={{ fontWeight: "600", fontSize: "0.9rem" }}>{travelers}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #eee", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
            <span style={{ color: "#888", fontSize: "0.9rem" }}>Total Paid</span>
            <span style={{ fontWeight: "800", color: "#d4af37", fontSize: "1rem" }}>₹{total?.toLocaleString()}</span>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
          color: "#d4af37", border: "none", borderRadius: "10px",
          padding: "0.85rem 2rem", fontSize: "1rem", fontWeight: "700",
          cursor: "pointer", width: "100%"
        }}>
          View My Bookings →
        </button>
      </div>
    </div>
  );
}

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({ travelers: 1, date: "" });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPackage = async () => {
      try {
        const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/trips/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPackageData(data);
      } catch (err) {
        setError("Failed to load package details");
      } finally {
        setPageLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate("/login"); return; }
    setLoading(true);
    setError("");

    try {
      const stored = localStorage.getItem("jj_user");
      const token = stored ? JSON.parse(stored)?.token : null;

      const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + "/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: id,
          travelers: parseInt(formData.travelers),
          date: formData.date,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Booking failed");
      }

      setShowSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <div className="container">Loading package details...</div>;
  if (error && !packageData) return <div className="container alert alert-danger">{error}</div>;
  if (!packageData) return <div className="container">Package not found</div>;

  const totalAmount = packageData.price * formData.travelers;

  return (
    <div className="container booking-container">
      {showSuccess && (
        <SuccessModal
          trip={packageData?.name}
          travelers={formData.travelers}
          total={packageData?.price * formData.travelers}
          onClose={() => navigate("/my-bookings")}
        />
      )}
      <h2>Book Your Trip: {packageData.name}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        <div className="col-md-6">
          <div className="package-details">
            <h4>Package Details</h4>
            <p><strong>Location:</strong> {packageData.location}</p>
            <p><strong>Price per person:</strong> ₹{packageData.price}</p>
            <p><strong>Duration:</strong> {packageData.duration}</p>
            <p><strong>Description:</strong> {packageData.description}</p>
          </div>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="travelers">Number of Travelers:</label>
              <input
                type="number" id="travelers" name="travelers"
                min="1" max={packageData.maxGroupSize || 99}
                value={formData.travelers}
                onChange={handleChange}
                className="form-control" required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Travel Date:</label>
              <input
                type="date" id="date" name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-control" required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="price-summary">
              <h5>Price Summary</h5>
              <p>₹{packageData.price} × {formData.travelers} travelers = <strong>₹{totalAmount}</strong></p>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;