import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar.js";
import "./DoctorDashboard.css";
import Inventory from "../Inventory.js";
import DoctorCreate from "./DoctorCreate.js";
import DoctorFeedback from "../DoctorFeedback.js";
import DoctorTransfusion from "../DoctorTransfusion.js";

const DoctorDashboard = () => {
  return (
    <div className="doctor-dashboard">
      <DoctorSidebar />
      <div className="doctor-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/create" element={<DoctorCreate />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/doctor-feedback" element={<DoctorFeedback />} />
          <Route path="/doctor-transfusion" element={<DoctorTransfusion />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="mainContainer">
      <h2>Welcome to the Doctor Dashboard!</h2>
      <p>
        This is the homepage. You can navigate to other sections using the
        sidebar.
      </p>
    </div>
  );
};

export default DoctorDashboard;
