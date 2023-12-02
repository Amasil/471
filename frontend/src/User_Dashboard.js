import React, { useEffect, useState } from "react";
import axios from "axios";

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
    // Find the selected user based on the User_ID
    const selected = users.find((user) => user.User_ID === userId);
    setSelectedUser(selected);
  };

  return (
    <div>
      <h1>Test All Users</h1>
      <div>
        {/* Dropdown to select users */}
        <select onChange={(e) => handleUserSelect(parseInt(e.target.value))}>
          <option value={null}>Select a user</option>
          {/* Map through the users and create an option for each */}
          {users.map((user) => (
            <option key={user.User_ID} value={user.User_ID}>
              {user.First_Name} {user.Middle_Name || ""} {user.Last_Name}
            </option>
          ))}
        </select>

        {/* Display selected user information */}
        {selectedUser && (
          <div className="user-details">
            <h2>User Information</h2>
            <p>User ID: {selectedUser.User_ID}</p>
            <p>First Name: {selectedUser.First_Name}</p>
            <p>Middle Name: {selectedUser.Middle_Name || "N/A"}</p>
            <p>Last Name: {selectedUser.Last_Name}</p>
            {/* Add other user information as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
