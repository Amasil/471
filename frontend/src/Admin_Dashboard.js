// Admin_Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";
import "./Admin_Dashboard.css";

const Admin_Dashboard = () => {
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
      ...selected, // Keep User_ID as is
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
    // Filter out User_ID from the newUserInfo
    const { User_ID, ...updatedInfo } = newUserInfo;

    try {
      // Only send request if there are changes
      if (JSON.stringify(updatedInfo) !== "{}") {
        await axios.put(`http://localhost:3000/user`, newUserInfo);
        console.log("User info updated successfully!");
        // Refetch users after successful update
        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data); // Update local state with the latest data

        // Update selectedUser with the latest information
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

    setIsEditing(false); // Reset editing mode
  };

  const handleDeleteUser = async () => {
    try {
      if (selectedUser && selectedUser.User_ID) {
        await axios.delete("http://localhost:3000/user", {
          data: { User_ID: selectedUser.User_ID },
        });

        console.log("User deleted successfully!");

        // Refetch users after successful deletion
        const res = await axios.get("http://localhost:3000/user");
        setUsers(res.data); // Update local state with the latest data

        setSelectedUser(null); // Reset selectedUser
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
        setIsEditing(false); // Reset editing mode
      } else {
        console.log("No user selected to delete.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          {/* <Route path="/users" element={<UsersSection />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );

  // function DashboardHome() {
  //   return <h2>Welcome to the Admin Dashboard!</h2>;
  // }

  function DashboardHome() {
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
        </div>
        {selectedUser && (
          <div className="user-details-container">
            <h2>User Information</h2>
            <table>
              <tbody>
                <tr>
                  <td>User ID:</td>
                  <td>{selectedUser.User_ID}</td>
                </tr>
                <tr>
                  <td>First Name:</td>
                  <td>{selectedUser.First_Name}</td>
                </tr>
                <tr>
                  <td>Middle Name:</td>
                  <td>{selectedUser.Middle_Name || "N/A"}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{selectedUser.Last_Name}</td>
                </tr>
                <tr>
                  <td>Username: </td>
                  <td>{selectedUser.Username}</td>
                </tr>
                <tr>
                  <td>Password: </td>
                  <td>{selectedUser.Password}</td>
                </tr>
                <tr>
                  <td>Email: </td>
                  <td>{selectedUser.Email}</td>
                </tr>
                <tr>
                  <td>Phone No: </td>
                  <td>{selectedUser.Phone_No}</td>
                </tr>
                <tr>
                  <td>Blood_Group: </td>
                  <td>{selectedUser.Blood_Group}</td>
                </tr>
                <tr>
                  <td>Last Donation Date: </td>
                  <td>{selectedUser.Last_Donation_Date}</td>
                </tr>
              </tbody>
            </table>

            {isEditing ? (
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
              <button onClick={() => setIsEditing(true)}>Edit User Info</button>
            )}
          </div>
        )}
      </div>
    );
  }
};
export default Admin_Dashboard;
