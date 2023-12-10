import React from "react";
import Sidebar from "../ui/dashboard/sidebar/sidebar.js";
import Navbar from "../ui/dashboard/navbar/navbar.js";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        {children}{" "}
      </div>
    </div>
  );
};

export default Layout;
