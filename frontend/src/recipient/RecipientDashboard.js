import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import RecipientSidebar from "./RecipientSidebar.js";
import "./RecipientDashboard.css";
import Feedback from "../Feedback.js";
import RecipientAppointments from "../RecipientTransfusion.js";

//change to functions for recipients - donation appointment switches to view transfusion appointment 
const RecipientDashboard = () => {
  return (
    <div className="recipient-dashboard">
      <RecipientSidebar />
      <div className="recipient-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/appointment" element={<RecipientAppointments />} />
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
      <h1>Welcome to the recipient dashboard!</h1>
    </div>
  );
};

export default RecipientDashboard;
