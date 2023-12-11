import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import AdminSidebar from "./AdminSidebar.js";
import "./Admin_Dashboard.css";
import Navbar from "./App.js";

const updateFavicon = (faviconURL) => {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = faviconURL;
  } else {
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.href = faviconURL;
    document.head.appendChild(newFavicon);
  }
};

const updateWebpageTitle = (title) => {
  document.title = title;
};

const DashboardHome = () => {
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-1-32-687612.png?f=webp&w=512"
    );
    updateWebpageTitle("Admin Dashboard");
  }, []);

  return (
    <div>
      <h2>Welcome to the Admin Dashboard!</h2>
      <p>
        This is the homepage. You can navigate to other sections using the
        sidebar.
      </p>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    User_ID: "",
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Username: "",
    Password: "",
    Email: "",
    Phone_No: "",
    Blood_Group: "",
    Last_Donation_Date: "",
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

    // Populate all the empty fields with the user's information
    setNewUserInfo({
      User_ID: selected.User_ID || "",
      First_Name: selected.First_Name || "",
      Middle_Name: selected.Middle_Name || "",
      Last_Name: selected.Last_Name || "",
      Username: selected.Username || "",
      Password: selected.Password || "",
      Email: selected.Email || "",
      Phone_No: selected.Phone_No || "",
      Blood_Group: selected.Blood_Group || "",
      Last_Donation_Date: selected.Last_Donation_Date || "",
    });

    setIsEditing(false); // Reset editing mode
  };

  const handleChangeUserInfo = async () => {
    const { User_ID, ...updatedInfo } = newUserInfo;

    try {
      if (JSON.stringify(updatedInfo) !== "{}") {
        await axios.put(`http://localhost:3000/user`, newUserInfo);
        console.log("User info updated successfully!");

        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data);

        const updatedSelectedUser = res.data.find(
          (user) => user.User_ID === selectedUser.User_ID
        );
        setSelectedUser(updatedSelectedUser);
      } else {
        console.log("No changes to update.");
      }
    } catch (err) {
      console.error("Error updating user info:", err);
    }

    setIsEditing(false);
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUser && selectedUser.User_ID) {
        await axios.delete("http://localhost:3000/user", {
          data: { User_ID: selectedUser.User_ID },
        });

        console.log("User deleted successfully!");

        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data);

        setSelectedUser(null);
        setNewUserInfo({
          User_ID: "",
          First_Name: "",
          Middle_Name: "",
          Last_Name: "",
          Username: "",
          Password: "",
          Email: "",
          Phone_No: "",
          Blood_Group: "",
          Last_Donation_Date: "",
        });
        setIsEditing(false);
      } else {
        console.log("No user selected to delete.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="users-container">
        <h1>Select a user to edit</h1>
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
        </div>
        {selectedUser && (
          <div className="user-details-container">
            <h2>User Information</h2>
            <p>User ID: {selectedUser.User_ID}</p>
            <p>First Name: {selectedUser.First_Name}</p>
            <p>Middle Name: {selectedUser.Middle_Name || "N/A"}</p>
            <p>Last Name: {selectedUser.Last_Name}</p>
            <p>Username: {selectedUser.Username}</p>
            <p>Password: {selectedUser.Password}</p>
            <p>Email: {selectedUser.Email}</p>
            <p>Phone Number: {selectedUser.Phone_No}</p>
            <p>Blood Group: {selectedUser.Blood_Group}</p>
            <p>Last Donation Date: {selectedUser.Last_Donation_Date}</p>

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
                <label>
                  Username:
                  <input
                    type="text"
                    value={newUserInfo.Username}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Username: e.target.value,
                      })
                    }
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    type="text"
                    value={newUserInfo.Password}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Password: e.target.value,
                      })
                    }
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="text"
                    value={newUserInfo.Email}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Email: e.target.value,
                      })
                    }
                  />
                </label>
                <br />
                <label>
                  Phone No:
                  <input
                    type="text"
                    value={newUserInfo.Phone_No}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Phone_No: e.target.value,
                      })
                    }
                  />
                </label>
                <br />
                <label>
                  Blood Group:
                  <select
                    value={newUserInfo.Blood_Group}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Blood_Group: e.target.value,
                      })
                    }
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </label>
                <br />
                <label>
                  Last Donation Date
                  <input
                    type="date"
                    value={newUserInfo.Last_Donation_Date}
                    onChange={(e) =>
                      setNewUserInfo({
                        ...newUserInfo,
                        Last_Donation_Date: e.target.value,
                      })
                    }
                  />
                </label>
                <br />
                <button onClick={handleChangeUserInfo}>Save Changes</button>
                <button onClick={handleDeleteUser}>Delete User</button>
              </div>
            ) : (
              // Render a button to enable editing mode
              <button onClick={() => setIsEditing(true)}>
                Edit/Delete User Info
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Admin_Dashboard = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-dashboard">
        <AdminSidebar />
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/users" element={<Users />} />
            {/* Add other routes for inventory or additional features */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
