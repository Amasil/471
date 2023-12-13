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
          location.pathname.startsWith("/donor-dashboard/edit") ? "active" : ""
        }
      >
        Edit User
      </Link>
      <Link
        to="/donor-dashboard/feedback"
        className={location.pathname === "/doctor-dashboard/feedback"}
      >
        Feedback
      </Link>
      <Link
        to="/user-login"
        className={location.pathname === "/user-login" ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

export default DonorSidebar;
