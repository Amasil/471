import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Users.css"; // Import the CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    User_ID: "",
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
  });
  const [isEditing, setIsEditing] = useState(false);

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
    setNewUserInfo(selected); // Set initial values for the form
    setIsEditing(false); // Reset editing mode
  };

  const handleChangeUserInfo = () => {
    console.log("Updated user info:", newUserInfo);
    setIsEditing(false); // Reset editing mode
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
      {selectedUser && (
        <div className="user-details-container">
          <h2>User Information</h2>
          <p>User ID: {selectedUser.User_ID}</p>
          <p>First Name: {selectedUser.First_Name}</p>
          <p>Middle Name: {selectedUser.Middle_Name || "N/A"}</p>
          <p>Last Name: {selectedUser.Last_Name}</p>

          {isEditing ? (
            // Render a form for editing the user info
            <div>
              <h2>Edit User Information</h2>
              <label>
                First Name:
                <input
                  type="text"
                  value={newUserInfo.First_Name}
                  onChange={(e) =>
                    setNewUserInfo({
                      ...newUserInfo,
                      First_Name: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Middle Name:
                <input
                  type="text"
                  value={newUserInfo.Middle_Name}
                  onChange={(e) =>
                    setNewUserInfo({
                      ...newUserInfo,
                      Middle_Name: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <label>
                Last Name:
                <input
                  type="text"
                  value={newUserInfo.Last_Name}
                  onChange={(e) =>
                    setNewUserInfo({
                      ...newUserInfo,
                      Last_Name: e.target.value,
                    })
                  }
                />
              </label>
              <br />
              <button onClick={handleChangeUserInfo}>Save Changes</button>
            </div>
          ) : (
            // Render a button to enable editing mode
            <button onClick={() => setIsEditing(true)}>Edit User Info</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
