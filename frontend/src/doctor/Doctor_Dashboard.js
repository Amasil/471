// Doctor_Dashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar.js";
import "./Doctor_Dashboard.css";
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

const DashboardHome = () => {
  return <h2>Welcome to the Doctor Dashboard!</h2>;
};

export default Doctor_Dashboard;
