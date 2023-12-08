// AdminSidebar.js

import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard">Dashboard</Link>

      {/* Add more links as needed */}
    </div>
  );
};

export default AdminSidebar;
//<Link to="/admin-dashboard/users">Users</Link>
//<Link to="/admin-dashboard/settings">Settings</Link>
