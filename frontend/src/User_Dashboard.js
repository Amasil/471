import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Users.css"; // Import the CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchAllUsers();
  }, []);

  const handleUserSelect = (userId) => {
    const selected = users.find((user) => user.User_ID === userId);
    setSelectedUser(selected);
  };

  return (
    <div className="users-container">
      <h1>Test All Users</h1>
      <div className="user-dropdown-container">
        <select
          className="user-dropdown"
          onChange={(e) => handleUserSelect(parseInt(e.target.value))}
        >
          <option value={null}>Select a user</option>
          {users.map((user) => (
            <option key={user.User_ID} value={user.User_ID}>
              {user.First_Name} {user.Middle_Name || ""} {user.Last_Name}
            </option>
          ))}
        </select>

        {selectedUser && (
          <div className="user-details-container">
            <h2>User Information</h2>
            <p>User ID: {selectedUser.User_ID}</p>
            <p>First Name: {selectedUser.First_Name}</p>
            <p>Middle Name: {selectedUser.Middle_Name || "N/A"}</p>
            <p>Last Name: {selectedUser.Last_Name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
