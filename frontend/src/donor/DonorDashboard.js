// Donor_Dashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DonorSidebar from "./DonorSidebar.js";
import "./DonorDashboard.css";
//import Users from "./Users";
//import Settings from "./Settings";
//import UserDashboard from "./User_Dashboard.js";
import Feedback from "../Feedback.js";

const Donor_Dashboard = () => {
  return (
    <div className="donor-dashboard">
      <DonorSidebar />
      <div className="donor-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  // Retrieve the username from localStorage
  const storedUsername = localStorage.getItem("username");

  return (
    <div>
      <h1>Welcome, {storedUsername}!</h1>
      {/* Other content of the user dashboard */}
    </div>
  );
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

export default Donor_Dashboard;
