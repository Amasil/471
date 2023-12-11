// Import React and other necessary modules
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";
import "./Admin_Dashboard.css";
import Users from "./User_Dashboard.js"; // Import the Users component
import Inventory from "./Inventory.js";

// Function to update favicon
const updateFavicon = (faviconURL) => {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = faviconURL;
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = faviconURL;
    document.head.appendChild(newFavicon);
  }
};

// Function to update webpage title
const updateWebpageTitle = (title) => {
  document.title = title;
};

// DashboardHome component
const DashboardHome = () => {
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-1-32-687612.png?f=webp&w=512"
    );
    updateWebpageTitle("Admin Dashboard");
  }, []);

  return (
    <div>
      <h2>Welcome to the Admin Dashboard!</h2>
      <div className="admin-container">// Get admin user information</div>
      <p>Select the users tab to edit users!</p>
    </div>
  );
};

// Admin_Dashboard component
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

// Other components (UsersSection, UserDashboard) remain unchanged
const UsersSection = () => {
  return <Users />; // Replace EditUser and CreateUser with the Users component
};

const UserDashboard = () => {
  return <h2>User Dashboard</h2>; // You can replace this with your User Dashboard component
};

export default Admin_Dashboard;
