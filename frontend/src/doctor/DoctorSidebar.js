// DoctorSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const DoctorSidebar = () => {
  const location = useLocation();

  return (
    <div className="doctor-sidebar">
      <Link
        to="/doctor-dashboard"
        className={location.pathname === "/doctor-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/doctor-dashboard/create"
        className={
          location.pathname.startsWith("/doctor-dashboard/") ? "active" : ""
        }
      >
        Create User
      </Link>
      <Link
        to="/doctor-dashboard/inventory"
        className={
          location.pathname.startsWith("/doctor-dashboard/") ? "active" : ""
        }
      >
        Inventory
      </Link>
      <Link
        to="/doctor-dashboard/doctor-feedback"
        className={
          location.pathname === "/doctor-dashboard/doctor-feedback"
            ? "active"
            : ""
        }
      >
        Feedback
      </Link>
      <Link
        to="/login-doctor"
        className={location.pathname === "/login-doctor" ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

export default DoctorSidebar;
