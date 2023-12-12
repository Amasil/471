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
        to="/doctor-dashboard/inventory"
        className={
          location.pathname.startsWith("/doctor-dashboard/") ? "active" : ""
        }
      >
        Inventory
      </Link>
      <Link
        to="/doctor-dashboard/settings"
        className={
          location.pathname === "/doctor-dashboard/settings" ? "active" : ""
        }
      >
        Settings
      </Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default DoctorSidebar;
