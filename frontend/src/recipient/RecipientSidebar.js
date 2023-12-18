// RecipientSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const RecipientSidebar = () => {
  const location = useLocation();

  return (
    <div className="recipient-sidebar">
      <Link
        to="/-dashboard"
        className={location.pathname === "/recipient-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/recipient-dashboard/appointment"
        className={
          location.pathname.startsWith("/recipient-dashboard/appointment")
            ? "active"
            : ""
        }
      >
        Transfusion Appointment{" "}
      </Link>
      <Link
        to="/recipient-dashboard/feedback"
        className={location.pathname === "/recipient-dashboard/feedback"}
      >
        Feedback
      </Link>
      <Link
        to="/recipient-login"
        className={location.pathname === "/recipient-login" ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

export default RecipientSidebar;
