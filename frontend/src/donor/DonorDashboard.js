// Donor_Dashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DonorSidebar from "./DonorSidebar.js";
import "./DonorDashboard.css";
import Feedback from "../Feedback.js";
import DonationAppt from "../DonationAppt.js";

const Donor_Dashboard = () => {
  return (
    <div className="donor-dashboard">
      <DonorSidebar />
      <div className="donor-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/appointment" element={<DonationAppt />} />
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

export default Donor_Dashboard;
