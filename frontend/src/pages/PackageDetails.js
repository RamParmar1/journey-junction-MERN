import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + `/trips/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPackageData(data);
      } catch (err) {
        setError("Failed to load package details");
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  if (loading) return <div className="container">Loading package details...</div>;
  if (error) return <div className="container alert alert-danger">{error}</div>;
  if (!packageData) return <div className="container">Package not found</div>;

  return (
    <div className="package-details-page">
      <div className="pd-container">
        <div className="pd-image-section">
          <img
            src={packageData.image || "/images/default-package.jpg"}
            alt={packageData.name}
            className="pd-image"
          />
        </div>
        
        <div className="pd-content-section">
          <div className="pd-header">
            <div className="pd-location">
              <i className="fa-solid fa-location-dot"></i> {packageData.location}
            </div>
            <h1 className="pd-title">{packageData.name}</h1>
          </div>
          
          <div className="pd-price-card">
            <span className="pd-price-label">Starting from</span>
            <span className="pd-price-value">₹{Number(packageData.price).toLocaleString()} <span className="pd-price-suffix">/ person</span></span>
          </div>

          <div className="pd-meta-grid">
            <div className="pd-meta-item">
              <div className="pd-meta-icon"><i className="fa-regular fa-clock"></i></div>
              <div className="pd-meta-text">
                <span className="pd-meta-label">Duration</span>
                <span className="pd-meta-value">{packageData.duration || "N/A"}</span>
              </div>
            </div>
            <div className="pd-meta-item">
              <div className="pd-meta-icon"><i className="fa-solid fa-user-group"></i></div>
              <div className="pd-meta-text">
                <span className="pd-meta-label">Max Group</span>
                <span className="pd-meta-value">{packageData.maxGroupSize || 99} people</span>
              </div>
            </div>
          </div>

          <div className="pd-description-section">
            <h3>About this trip</h3>
            <p className="pd-description">{packageData.description}</p>
          </div>

          <div className="pd-action-area">
            {user?.isAdmin ? (
              <div className="pd-admin-badge">
                <i className="fa-solid fa-crown"></i> Admin View (Booking Disabled)
              </div>
            ) : user ? (
              <Link to={`/booking/${packageData._id}`} className="pd-btn pd-btn-primary">
                Book This Package <i className="fa-solid fa-arrow-right"></i>
              </Link>
            ) : (
              <div className="pd-login-prompt">
                <p>Want to book this amazing trip?</p>
                <Link to="/login" className="pd-btn pd-btn-outline">
                  Login to Continue
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;