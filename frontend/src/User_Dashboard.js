import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // useEffect to fetch users when the component mounts
  useEffect(() => {
    // Define an async function for fetching users
    const fetchAllUsers = async () => {
      try {
        // Make a GET request to the API endpoint
        const res = await axios.get("http://localhost:3000/user");

        // Update the state with the received user data
        setUsers(res.data);

        // Log the received data for debugging purposes
        console.log(res.data);
      } catch (err) {
        // Log any errors that occur during the fetch
        console.error("Error fetching users:", err);
      }
    };

    // Call the fetchAllUsers function
    fetchAllUsers();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  // Render the component
  return (
    <div>
      <h1>Test All Users</h1>
      <div className="user-list">
        {/* Map through the users and render each user */}
        {users.map((user) => (
          <div key={user.User_ID} className="user-item">
            <h2>{user.First_Name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
