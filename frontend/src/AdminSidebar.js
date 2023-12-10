// AdminSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <Link
        to="/admin-dashboard"
        className={location.pathname === "/admin-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/user-dashboard"
        className={location.pathname.startsWith("/user-dashboard") ? "active" : ""}
      >
        Users
      </Link>
      <Link
        to="/inventory"
        className={location.pathname.startsWith("/inventory") ? "active" : ""}
      >
        Inventory
      </Link>
      <Link
        to="/admin-login"
        className={location.pathname.startsWith("/admin-login") ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

export default AdminSidebar;