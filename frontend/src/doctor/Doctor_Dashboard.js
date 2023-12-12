// Doctor_Dashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar.js";
import "../DashboardStyles.css";
import Inventory from "../Inventory.js";
const Doctor_Dashboard = () => {
  return (
    <div className="doctor-dashboard">
      <DoctorSidebar />
      <div className="doctor-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/inventory" element={<Inventory />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};
//          <Route path="user-dashboard" element={<UserDashboard />} />

const DashboardHome = () => {
  return <h2>Welcome to the Doctor Dashboard!</h2>;
};

const UsersSection = () => {
  let { action } = useParams();

  // Render different components based on the route parameter
  if (action === "edit") {
    return <EditUser />;
  } else if (action === "create") {
    return <CreateUser />;
  } else {
  }
};

const EditUser = () => {
  return <h2>Edit User</h2>;
};

const CreateUser = () => {
  return <h2>Create User</h2>;
};

export default Doctor_Dashboard;
