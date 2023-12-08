// Admin_Dashboard.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";
//import Users from "./Users"; // Create Users component for the Users route
//import Settings from "./Settings"; // Create Settings component for the Settings route

const Admin_Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return <h2>Welcome to the Admin Dashboard!</h2>;
};

export default Admin_Dashboard;
//<Route path="users" element={<Users />} />
//<Route path="settings" element={<Settings />} />
