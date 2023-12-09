// DonorSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const DonorSidebar = () => {
  const location = useLocation();

  return (
    <div className="donor-sidebar">
      <Link
        to="/donor-dashboard"
        className={location.pathname === "/donor-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/donor-dashboard/edit"
        className={
          location.pathname.startsWith("/doctor-dashboard/edit") ? "active" : ""
        }
      >
        Edit User
      </Link>
      <Link
        to="/donor-dashboard/settings"
        className={
          location.pathname === "/donor-dashboard/settings" ? "active" : ""
        }
      >
        Settings
      </Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default DonorSidebar;
