// AdminSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <Link
        to="/"
        className={location.pathname === "/" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/user-dashboard"
        className={location.pathname.startsWith("/user-dashboard") ? "active" : ""}
      >
        Users
      </Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default AdminSidebar;