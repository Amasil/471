// Recipient_Dashboard.js

import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import RecipientSidebar from "./RecipientSidebar.js";
import "./Recipient_Dashboard.css";
//import Users from "./Users";
//import Settings from "./Settings";
//import UserDashboard from "./User_Dashboard.js";
import Feedback from "../Feedback.js";

const Recipient_Dashboard = () => {
  return (
    <div className="recipient-dashboard">
      <RecipientSidebar />
      <div className="recipient-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </div>
  );
};
//<Route path="user-dashboard" element={<UserDashboard />} />
const DashboardHome = () => {
  return <h2>Welcome to the Recipient Dashboard!</h2>;
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

export default Recipient_Dashboard;
