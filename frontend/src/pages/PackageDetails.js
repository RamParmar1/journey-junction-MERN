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
        const res = await fetch(`/api/trips/${id}`);
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
    <div className="container package-details">
      <div className="row">
        <div className="col-md-6">
          <img
            src={packageData.image || "/images/default-package.jpg"}
            alt={packageData.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{packageData.name}</h2>
          <p className="location"><strong>Location:</strong> {packageData.location}</p>
          <p className="price"><strong>Price:</strong> ₹{packageData.price} per person</p>
          <p className="description">{packageData.description}</p>
          <p><strong>Duration:</strong> {packageData.duration}</p>
          <p><strong>Max Group Size:</strong> {packageData.maxGroupSize} people</p>

          {user?.isAdmin ? (
            <div style={{
              background: "#fff3cd", border: "1px solid #ffc107",
              borderRadius: "8px", padding: "0.75rem 1.25rem",
              color: "#856404", fontWeight: "500", fontSize: "0.95rem"
            }}>
              👑 Admin view 
            </div>
          ) : user ? (
            <Link to={`/booking/${packageData._id}`} className="btn btn-primary btn-lg">
              Book Now
            </Link>
          ) : (
            <Link to="/login" className="btn btn-outline-primary btn-lg">
              Login to Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;