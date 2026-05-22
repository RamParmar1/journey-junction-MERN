import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";
import "./Booking.css";

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

      toast.success("Booking Confirmed! You can view it in My Bookings.");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <div className="container">Loading package details...</div>;
  if (!packageData) return <div className="container">Package not found</div>;

  const totalAmount = packageData.price * formData.travelers;

  return (
    <div className="booking-page">
      <div className="bk-container">
        <h1 className="bk-page-title">Complete Your Booking</h1>
        
        <div className="bk-layout">
          {/* Left Side: Package Summary */}
          <div className="bk-summary-card">
            <div className="bk-summary-header">
              <h3>{packageData.name}</h3>
              <span className="bk-location"><i className="fa-solid fa-location-dot"></i> {packageData.location}</span>
            </div>
            
            <div className="bk-summary-details">
              <div className="bk-detail-row">
                <span className="bk-detail-label">Duration</span>
                <span className="bk-detail-value">{packageData.duration}</span>
              </div>
              <div className="bk-detail-row">
                <span className="bk-detail-label">Price per traveler</span>
                <span className="bk-detail-value">₹{packageData.price.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bk-summary-desc">
              <p>{packageData.description}</p>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="bk-form-card">
            <h2>Travel Details</h2>
            <form onSubmit={handleSubmit} className="bk-form">
              <div className="bk-form-group">
                <label htmlFor="travelers">Number of Travelers</label>
                <div className="bk-input-wrapper">
                  <i className="fa-solid fa-users bk-input-icon"></i>
                  <input
                    type="number" id="travelers" name="travelers"
                    min="1" max={packageData.maxGroupSize || 99}
                    value={formData.travelers}
                    onChange={handleChange}
                    className="bk-input" required
                  />
                </div>
              </div>

              <div className="bk-form-group">
                <label htmlFor="date">Travel Date</label>
                <div className="bk-input-wrapper">
                  <i className="fa-regular fa-calendar bk-input-icon"></i>
                  <input
                    type="date" id="date" name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bk-input" required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="bk-total-section">
                <span className="bk-total-label">Total Amount</span>
                <span className="bk-total-value">₹{totalAmount.toLocaleString()}</span>
                <div className="bk-total-calc">
                  (₹{packageData.price.toLocaleString()} × {formData.travelers} travelers)
                </div>
              </div>

              <button type="submit" className="bk-submit-btn" disabled={loading}>
                {loading ? (
                  <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
                ) : (
                  <><i className="fa-solid fa-check"></i> Confirm Booking</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;