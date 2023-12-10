// Admin_Dashboard.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";
import "./Admin_Dashboard.css";
import Users from "./User_Dashboard.js"; // Import the Users component
import Inventory from "./Inventory.js";

const Admin_Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="user-dashboard" element={<UserDashboard />} />
          <Route path="inventory" element={<Inventory />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div>
      <h2>Welcome to the Admin Dashboard!</h2>
      <div className="admin-container">
        //Get admin user information
      </div>
      <p>Select the users tab to edit users!</p>
    </div>
  );
};

const UsersSection = () => {
  return <Users />; // Replace EditUser and CreateUser with the Users component
};

const UserDashboard = () => {
  return <h2>User Dashboard</h2>; // You can replace this with your User Dashboard component
};

export default Admin_Dashboard;
