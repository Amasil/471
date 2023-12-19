import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

//needs to be changed to reflect new database
const CreateUser = () => {
  const [user, setUser] = useState({
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Username: "",
    Password: "",
    Email: "",
    Phone_No: "",
    Blood_Group: "",
    Last_Donation_Date: "",
    User_Type: "Donor", // Set the default user type to "Donor"
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const Navigate = useNavigate();
  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user", user);
      Navigate("/donor-login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/free/png-512/free-user-add-plus-contact-account-new-create-7-3318.png?f=webp&w=512"
    );
    updateWebpageTitle("Donor Registration");
  }, []);
  return (
    <div>
      <div className="login-container">
        <h2>Donor Registration</h2>
        <form id="registrationForm" onSubmit={handleRegistration}>
          <label htmlFor="registerFirstName" className="required">
            First Name:
          </label>
          <input
            type="text"
            id="register-firstName"
            onChange={handleChange}
            name="First_Name"
            required
          />
          <br />

          <label htmlFor="registerMiddleName">Middle Name:</label>
          <input
            type="text"
            id="register-middleName"
            onChange={handleChange}
            name="Middle_Name"
          />
          <br />

          <label htmlFor="registerLastName" className="required">
            Last Name:
          </label>
          <input
            type="text"
            id="register-lastName"
            onChange={handleChange}
            name="Last_Name"
            required
          />
          <br />

          <label htmlFor="registerUsername" className="required">
            Username:
          </label>
          <input
            type="text"
            id="register-username"
            onChange={handleChange}
            name="Username"
            required
          />
          <span id="usernameAvailability"></span>
          <br />

          <label htmlFor="registerPassword" className="required">
            Password:
          </label>
          <input
            type="password"
            id="register-password"
            onChange={handleChange}
            name="Password"
            required
          />
          <br />

          <label htmlFor="registerEmail" className="required">
            Email:
          </label>
          <input
            type="email"
            id="register-email"
            onChange={handleChange}
            name="Email"
            required
          />
          <br />
          <span id="emailAvailability"></span>
          <br />

          <label htmlFor="registerPhone" className="required">
            Phone Number:
          </label>
          <input
            type="tel"
            id="register-phone"
            name="Phone_No"
            onChange={handleChange}
            required
          />
          <br />
          <span id="telAvailability"></span>
          <br />

          <label htmlFor="registerBloodGroup" className="required">
            Blood Group:
          </label>
          <select
            id="register-bloodGroup"
            onChange={handleChange}
            name="Blood_Group"
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
          <br />

          <label htmlFor="registerLastDonationDate">Last Donation Date:</label>
          <input
            type="date"
            id="register-lastDonationDate"
            onChange={handleChange}
            name="Last_Donation_Date"
          />
          <label htmlFor="registerUserType" className="required">
            User Type:
          </label>
          <select
            id="register-userType"
            onChange={handleChange}
            name="User_Type"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Donor">Donor</option>
            <option value="Recipient">Receipient</option>
          </select>
          <br />
          <p className="note">Leave empty if unsure</p>
          <button type="submit" id="registerButton">
            Register
          </button>

          <p className="note-asterisk">
            Note: Fields marked with{" "}
            <span style={{ fontSize: "1.2em" }}>(*)</span> are mandatory
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
