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


const CreateUser = () => {
  const initialUserState = {
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Username: "",
    Password: "",
    Email: "",
    Phone_No: "",
    Blood_Group: "",
    Last_Donation_Date: "",
    User_Type: "Donor",
  };

  const [user, setUser] = useState(initialUserState);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/user", user);
      setShowPopup(true);
      window.alert(`Username ${user.Username} signed up!`);
      setUser(initialUserState); // Reset the form fields
    } catch (error) {
      console.error(error);
    }
  };

  const shouldShowBloodGroupAndDate =
    user.User_Type === "Donor" || user.User_Type === "Recipient";

  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/free/png-512/free-user-add-plus-contact-account-new-create-7-3318.png?f=webp&w=512"
    );
    updateWebpageTitle("User Registration");
  }, []);

  return (
    <div>
      <div className="login-container">
        <h2>User Registration</h2>
        <form id="registrationForm" onSubmit={handleRegistration}>
          <label htmlFor="registerFirstName" className="required">
            First Name:
          </label>
          <input
            type="text"
            id="register-firstName"
            onChange={handleChange}
            name="First_Name"
            value={user.First_Name}
            defaultValue=""
            required
          />
          <br />

          <label htmlFor="registerMiddleName">Middle Name:</label>
          <input
            type="text"
            id="register-middleName"
            onChange={handleChange}
            name="Middle_Name"

            value={user.Middle_Name}
            defaultValue=""
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
            value={user.Last_Name}
            defaultValue=""
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
            value={user.Username}
            defaultValue=""
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
            value={user.Password}
            defaultValue=""
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
            value={user.Email}
            defaultValue=""
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
            value={user.Phone_No}
            defaultValue=""
            onChange={handleChange}
            required
          />
          <br />
          <span id="telAvailability"></span>
          <br />

          <label htmlFor="registerUserType" className="required">
            User Type:
          </label>
          <select
            id="register-userType"
            onChange={handleChange}
            name="User_Type"
            value={user.User_Type}
            defaultValue="Admin"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
            <option value="Donor">Donor</option>
            <option value="Recipient">Recipient</option>
          </select>
          <br />

          {["Donor", "Recipient"].includes(user.User_Type) && (
            <>
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

              <label htmlFor="registerLastDonationDate">
                Last Donation Date:
              </label>
              <input
                type="date"
                id="register-lastDonationDate"
                onChange={handleChange}
                name="Last_Donation_Date"
                value={user.Last_Donation_Date}
                defaultValue=""
              />
              <br />
            </>
          )}

          {/* ... (remaining input fields) */}

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