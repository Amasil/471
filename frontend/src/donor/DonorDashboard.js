// DonorDashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DonorSidebar from "./DonorSidebar.js";
import "./DonorDashboard.css";
import Feedback from "../Feedback.js";
import DonationAppt from "../DonationAppt.js";

const DonorDashboard = () => {
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
      <h1>Welcome to the donor dashboard!</h1>
    </div>
  );
};

export default DonorDashboard;
