// AdminSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className={location.pathname === "/" ? "active" : ""}>
        Dashboard
      </Link>
      <Link to="/admin-dashboard/users" className={location.pathname === "/users" ? "active" : ""}>
        Users
      </Link>
      <Link to="/admin-dashboard/settings" className={location.pathname === "settings" ? "active" : ""}>
        Settings
      </Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default AdminSidebar;
