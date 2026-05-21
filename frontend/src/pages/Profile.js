import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile } from '../api';
import "./Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("jj_user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data } = await getProfile();
        setUserData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) return (
    <div className="profile-loading">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-glow"></div>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="profile-title">
              <h1>Welcome back, <span className="highlight-text">{userData?.name?.split(' ')[0]}</span></h1>
              <p className="profile-subtitle">Manage your personal details and preferences here.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-card">
            <div className="card-header">
              <h2><i className="fa-regular fa-id-card"></i> Personal Information</h2>
              <button className="btn-edit-profile"><i className="fa-solid fa-pen"></i> Edit</button>
            </div>

            <div className="profile-details">
              <div className="detail-group">
                <label>Full Name</label>
                <div className="detail-value">{userData?.name}</div>
              </div>

              <div className="detail-group">
                <label>Email Address</label>
                <div className="detail-value">{userData?.email}</div>
              </div>

              <div className="detail-group">
                <label>Account Status</label>
                <div className="detail-value">
                  <span className="status-badge"><i className="fa-solid fa-check"></i> Active</span>
                </div>
              </div>

              <div className="detail-group">
                <label>Member Since</label>
                <div className="detail-value">March 2026</div> {/* Hardcoded placeholder for now since there might not be createdAt */}
              </div>
            </div>
          </div>

          <div className="profile-sidebar">
            <div className="quick-actions-card">
              <h3>Quick Links</h3>
              <ul className="action-links">
                <li onClick={() => navigate('/my-bookings')}>
                  <i className="fa-solid fa-ticket"></i>
                  <span>My Bookings</span>
                  <i className="fa-solid fa-chevron-right ml-auto"></i>
                </li>
                <li onClick={() => navigate('/packages')}>
                  <i className="fa-solid fa-compass"></i>
                  <span>Explore New Trips</span>
                  <i className="fa-solid fa-chevron-right ml-auto"></i>
                </li>
                {userData?.isAdmin && (
                  <li onClick={() => navigate('/admin')} className="admin-link">
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Admin Dashboard</span>
                    <i className="fa-solid fa-chevron-right ml-auto"></i>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ml-auto { margin-left: auto; }
      `}</style>
    </div>
  );
}
