// ViewUser.js
import React from "react";

const ViewUser = ({ userData }) => {
  // Assume userData is passed as a prop from the parent component
  return (
    <div>
      <h3>User Information</h3>
      <p>Email: {userData.email}</p>
      {/* Display other user information based on role */}
    </div>
  );
};

export default ViewUser;
