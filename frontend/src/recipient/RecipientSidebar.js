// RecipientSidebar.js

import React from "react";
import { Link, useLocation } from "react-router-dom";

const RecipientSidebar = () => {
  const location = useLocation();

  return (
    <div className="recipient-sidebar">
      <Link
        to="/recipient-dashboard"
        className={location.pathname === "/recipient-dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link
        to="/recipient-dashboard/appointments"
        className={
          location.pathname.startsWith("/recipient-dashboard/appointments")
            ? "active"
            : ""
        }
      >
        Upcoming appointments
      </Link>
      <Link
        to="/recipient-dashboard/feedback"
        className={
          location.pathname === "/recipient-dashboard/feedback" ? "active" : ""
        }
      >
        Feedback
      </Link>
      <Link
        to="/user-login"
        className={location.pathname === "/user-login" ? "active" : ""}
      >
        Logout
      </Link>
    </div>
  );
};

export default RecipientSidebar;