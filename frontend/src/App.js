import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App_Style.css";
import UserDashboard from "./User_Dashboard.js";
import Admin_Dashboard from "./admin/Admin_Dashboard.js";
import UsersSection from "./admin/Admin_Dashboard.js";
import Doctor_Dashboard from "./doctor/Doctor_Dashboard.js";
import Donor_Dashboard from "./donor/Donor_Dashboard.js";
import Recipient_Dashboard from "./recipient/Recipient_Dashboard.js";

const Navbar = () => {
  return (
    <div className="topnav">
      <Link to="/admin-login">Admin Login</Link>
      <Link to="/login-doctor">Doctor Login</Link>
      <Link to="/user-registration">Sign Up as User</Link>
      <Link to="/user-login" className="home">
        <img src="https://img.icons8.com/ios/50/000000/home.png" alt="Home" />
      </Link>
    </div>
  );
};

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

const UserLogin = () => {
  const validateUserLogin = (event) => {};
  const Navigate = useNavigate();

  useEffect(() => {
    updateFavicon(
      //"https://cdn.iconscout.com/icon/free/png-512/free-user-1851010-1568997.png?f=webp&w=512"
      "https://cdn.iconscout.com/icon/free/png-512/free-user-employee-avatar-man-person-businessman-15-17179.png?f=webp&w=512"
    );
    updateWebpageTitle("User Login");
  }, []);

  const redirectToDonorDashboard = () => {
    // Simulate a successful login by directly redirecting to the donor dashboard
    Navigate("/donor-dashboard");
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>User Login</h2>
        <form onSubmit={(e) => e.preventDefault() || validateUserLogin(e)}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="button" onClick={redirectToDonorDashboard}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const validateAdminLogin = (event) => {};
  const Navigate = useNavigate();
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-1-32-687612.png?f=webp&w=512"
    );
    updateWebpageTitle("Admin Login");
  }, []);
  const redirectToAdminDashboard = () => {
    // Simulate a successful login by directly redirecting to the admin dashboard
    Navigate("/admin-dashboard");
  };
  return (
    <div>
      {/* Navbar component (assuming it's defined somewhere) */}
      <Navbar />
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="button" onClick={redirectToAdminDashboard}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const DoctorLogin = () => {
  const validateDoctorLogin = (event) => {};
  const Navigate = useNavigate();
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/doctor-567-1118047.png?f=webp&w=512"
    );
    updateWebpageTitle("Doctor Login");
  }, []);
  const redirectToDoctorDashboard = () => {
    // Simulate a successful login by directly redirecting to the doctor dashboard
    Navigate("/doctor-dashboard");
  };
  return (
    <div>
      {/* Navbar component (assuming it's defined somewhere) */}
      <Navbar />
      <div className="login-container">
        <h2>Doctor Login</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="button" onClick={redirectToDoctorDashboard}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const UserRegistration = () => {
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
      Navigate("/user-login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/free/png-512/free-user-add-plus-contact-account-new-create-7-3318.png?f=webp&w=512"
    );
    updateWebpageTitle("User Registration");
  }, []);
  return (
    <div>
      <Navbar />
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/login-doctor" element={<DoctorLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard/*" element={<Admin_Dashboard />} />
        <Route path="/users" element={<UsersSection />} />
        <Route path="/doctor-dashboard" element={<Doctor_Dashboard />} />
        <Route path="/doctor-dashboard/*" element={<Doctor_Dashboard />} />
        <Route path="/donor-dashboard" element={<Donor_Dashboard />} />
        <Route path="/recipient-dashboard" element={<Recipient_Dashboard />} />
        {/* Set the default route to UserLogin */}
        <Route index element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
