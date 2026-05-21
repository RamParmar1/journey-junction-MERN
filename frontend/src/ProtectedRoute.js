// frontend/src/ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * Usage:
 * <Route path="/profile" element={
 *   <ProtectedRoute>
 *     <Profile />
 *   </ProtectedRoute>
 * } />
 *
 * If user is not logged-in, they are redirected to /login.
 * We also pass `state.from` so after login you can redirect them back.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // send user to login and remember where they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
