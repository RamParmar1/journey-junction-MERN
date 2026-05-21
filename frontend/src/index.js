import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Global vendor CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);















