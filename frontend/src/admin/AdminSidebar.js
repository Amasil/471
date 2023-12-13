import React from "react";
import { Link, useLocation } from "react-router-dom";

// AdminSidebar component representing the sidebar navigation for the admin dashboard
const AdminSidebar = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();

  return (
    // Container for the admin sidebar
    <div className="admin-sidebar">
      {/* Link to the Dashboard with an "active" class if it's the current route */}
      <Link
        to="/admin-dashboard"
        className={location.pathname === "/admin-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      {/* Link to the Users section with an "active" class if it's part of the current route */}
      <Link
        to="/admin-dashboard/users"
        className={
          location.pathname.startsWith("/admin-dashboard/users") ? "active" : ""
        }
      >
        Users
      </Link>
      {/* Link to the Create User section with an "active" class if it's part of the current route */}
      <Link
        to="/admin-dashboard/create-user"
        className={
          location.pathname.startsWith("/admin-dashboard/create-user")
            ? "active"
            : ""
        }
      >
        Create User
      </Link>
      {/* Link to the Inventory section with an "active" class if it's part of the current route */}
      <Link
        to="/admin-dashboard/inventory"
        className={
          location.pathname.startsWith("/admin-dashboard/") ? "active" : ""
        }
      >
        Inventory
      </Link>
      {/* Link to the Admin Login section with an "active" class if it's part of the current route */}
      <Link
        to="/admin-login"
        className={location.pathname.startsWith("/admin-login") ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

// Exporting the AdminSidebar component as the default export
export default AdminSidebar;
