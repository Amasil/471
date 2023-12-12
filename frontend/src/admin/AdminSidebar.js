import React from "react";
import { Link, useLocation } from "react-router-dom";

const adminSidebar = () => {
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
        to="/admin-dashboard/users"
        className={
          location.pathname.startsWith("/admin-dashboard/users") ? "active" : ""
        }
      >
        Users
      </Link>
      <Link
        to="/admin-dashboard/inventory"
        className={
          location.pathname.startsWith("/admin-dashboard/") ? "active" : ""
        }
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

export default adminSidebar;
