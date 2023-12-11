// Importing necessary dependencies and components
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "./AdminSidebar.js";
import "./Admin_Dashboard.css";
import Inventory from "./Inventory.js";

// Function to update the favicon of the webpage
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

// Function to update the webpage title
const updateWebpageTitle = (title) => {
  document.title = title;
};

// Component for the dashboard home page
const DashboardHome = () => {
  useEffect(() => {
    // Update favicon and webpage title on component mount
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

// Component for managing users
const Users = () => {
  // State variables for managing user data and editing state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    // Initial state for user information
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
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
  const [cancelClicked, setCancelClicked] = useState(false);

  // Fetch all users from the server on component mount
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

  // Handler for selecting a user for editing
  const handleUserSelect = (userId) => {
    // Find the selected user from the user list
    const selected = users.find((user) => user.User_ID === userId);
    setSelectedUser(selected);

    // Set user information for editing
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

    // Enable editing mode and update button states
    setIsDeleteButtonDisabled(false);
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setCancelClicked(false); // Reset cancelClicked state
  };

  // Handler for updating user information
  const handleChangeUserInfo = async () => {
    const { User_ID, ...updatedInfo } = newUserInfo;

    try {
      // Check if there are changes to update
      if (JSON.stringify(updatedInfo) !== "{}") {
        await axios.put(`http://localhost:3000/user`, newUserInfo);
        console.log("User info updated successfully!");

        // Fetch updated user list from the server
        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data);

        // Update selected user information
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

    // Disable editing mode and reset button states
    setIsEditing(false);
    setIsDeleteButtonDisabled(true);
    setCancelClicked(false); // Reset cancelClicked state
  };

  // Handler for deleting a user and canceling the operation
const handleDeleteUserAndCancel = async (userId) => {
  // Display a confirmation pop-up
  const userConfirmed = window.confirm("Are you sure you want to delete this user?");
  
  if (userConfirmed) {
    try {
      // Delete the user and set cancelClicked state
      await handleDeleteUser(userId);
      setCancelClicked(true);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

// Handler for deleting a user
const handleDeleteUser = async () => {
  try {
    // Check if a user is selected for deletion
    if (selectedUser && selectedUser.User_ID) {
      // Display a confirmation pop-up
      const userConfirmed = window.confirm("Are you sure you want to delete this user?");
      
      if (userConfirmed) {
        // If user confirms, proceed with deletion
        await axios.delete("http://localhost:3000/user", {
          data: { User_ID: selectedUser.User_ID },
        });

        console.log("User deleted successfully!");

        // Fetch updated user list from the server
        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data);

        // Reset selected user and user information
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

        // Disable editing mode and reset button states
        setIsEditing(false);
        setIsDeleteButtonDisabled(true);
      }
    } else {
      console.log("No user selected to delete.");
    }
  } catch (err) {
    console.error("Error deleting user:", err);
  }
};

  // Rendering UI for user management
  return (
    <div className="admin-dashboard">
      <div className="users-container">
        <h1>User List</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through the list of users and rendering rows */}
            {users.map((user) => (
              <React.Fragment key={user.User_ID}>
                <tr>
                  <td>{user.User_ID}</td>
                  <td>{user.First_Name}</td>
                  <td>{user.Last_Name}</td>
                  <td>
                    <button onClick={() => handleUserSelect(user.User_ID)}>
                      {/* Display "Cancel" or "Edit" based on editing state */}
                      {isEditing &&
                      selectedUser &&
                      selectedUser.User_ID === user.User_ID
                        ? "Cancel"
                        : "Edit"}
                    </button>
                    {/* Display delete button during editing mode */}
                    {isEditing &&
                      selectedUser &&
                      selectedUser.User_ID === user.User_ID && (
                        <button
                          onClick={() =>
                            handleDeleteUserAndCancel(user.User_ID)
                          }
                          disabled={isDeleteButtonDisabled || cancelClicked}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      )}
                  </td>
                </tr>
                {/* Display additional row for editing user information */}
                {isEditing &&
                  selectedUser &&
                  selectedUser.User_ID === user.User_ID && (
                    <tr>
                      <td colSpan="4">
                        <div>
                          <h2>Edit User Information</h2>
                          {/* Input fields for editing user information */}
                          {/* ... (omitted for brevity) ... */}
                          <button onClick={handleChangeUserInfo}>
                            Save Changes
                          </button>
                          {/* Button to cancel editing */}
                          <button
                            onClick={() => {
                              setIsEditing(false); // Stop editing mode
                              setIsDeleteButtonDisabled(false); // Disable delete button
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main component for the admin dashboard
const Admin_Dashboard = () => {
  return (
    <div className="admin-navbar">
      <div className="admin-dashboard">
        {/* Render the admin sidebar */}
        <AdminSidebar />
        <div className="admin-content">
          {/* Define routes for different sections of the admin dashboard */}
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/users" element={<Users />} />
            <Route path="/inventory" element={<Inventory />} />
            {/* Add other routes for inventory or additional features */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Export the Admin_Dashboard component as the default export
export default Admin_Dashboard;
