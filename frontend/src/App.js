import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import "./AppStyle.css";
import UserDashboard from "./User_Dashboard.js";
import AdminDashboard from "./admin/AdminDashboard.js";
// If adminDashboard breaks it, rename it
import UsersSection from "./admin/AdminDashboard.js";
import DoctorDashboard from "./doctor/DoctorDashboard.js";
import DonorDashboard from "./donor/DonorDashboard.js";
import RecipientDashboard from "./recipient/RecipientDashboard.js";

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

const LoginForm = ({ userType, onLogin, setUsername }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setUserCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setLoginError(null);
  };

  const handleLogin = async () => {
    try {
      // Send a request to your authentication API
      const response = await axios.post("http://localhost:3000/login", {
        username: userCredentials.username,
        password: userCredentials.password,
        userType: userType,
      });

      // Assuming the API responds with a token upon successful login
      const authToken = response.data.token;

      // Save the token to localStorage or a state management solution (e.g., Redux)
      localStorage.setItem("authToken", authToken);
      // Redirect to the user dashboard upon successful login
      onLogin();
    } catch (error) {
      console.error("Login failed:", error);
      // Set the login error and clear the password field
      setLoginError("Login failed, check your credentials.");
      setUserCredentials((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  return (
    <form>
      <label htmlFor="username" className="required">
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        required
      />

      <label htmlFor="password" className="required">
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        required
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <p className="note-asterisk">
        Note: Fields marked with <span style={{ fontSize: "1.2em" }}>(*)</span>{" "}
        are mandatory
      </p>
      {loginError && <p className="login-error">{loginError}</p>}
    </form>
  );
};

const UserLogin = ({ setAuthenticated }) => {
  const Navigate = useNavigate();
  const [username, setUsername] = useState(""); // Add state for username

  const handleUserLogin = () => {
    setAuthenticated(true);
    localStorage.setItem("username", username); // Store the username in localStorage
    Navigate("/donor-dashboard");
  };

  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/free/png-512/free-user-employee-avatar-man-person-businessman-15-17179.png?f=webp&w=512"
    );
    updateWebpageTitle("User Login");
  }, []);

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>User Login</h2>
        <LoginForm
          userType="Donor"
          onLogin={handleUserLogin}
          setUsername={setUsername}
        />
      </div>
    </div>
  );
};

const AdminLogin = ({ setAuthenticated }) => {
  const Navigate = useNavigate();

  const handleAdminLogin = () => {
    setAuthenticated(true);
    Navigate("/admin-dashboard");
  };
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-1-32-687612.png?f=webp&w=512"
    );
    updateWebpageTitle("Admin Login");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Admin Login</h2>
        <LoginForm userType="Admin" onLogin={handleAdminLogin} />
      </div>
    </div>
  );
};

const DoctorLogin = ({ setAuthenticated }) => {
  const Navigate = useNavigate();

  const handleDoctorLogin = () => {
    setAuthenticated(true);
    Navigate("/doctor-dashboard");
  };
  useEffect(() => {
    updateFavicon(
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/doctor-567-1118047.png?f=webp&w=512"
    );
    updateWebpageTitle("Doctor Login");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h2>Doctor Login</h2>
        <LoginForm userType="Doctor" onLogin={handleDoctorLogin} />
      </div>
    </div>
  );
};

const handleLogout = () => {
  // Clear authentication state
  // setAuthenticated(false);
  // Redirect to the login page
  Navigate("/user-login");
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
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/user-login"
          element={<UserLogin setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="/admin-login"
          element={<AdminLogin setAuthenticated={setAuthenticated} />}
        />
        <Route
          path="/login-doctor"
          element={<DoctorLogin setAuthenticated={setAuthenticated} />}
        />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/user-login" />
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            isAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
        <Route path="/users" element={<UsersSection />} />
        <Route
          path="/doctor-dashboard/*"
          element={
            isAuthenticated ? (
              <DoctorDashboard />
            ) : (
              <Navigate to="/login-doctor" />
            )
          }
        />
        <Route
          path="/donor-dashboard/*"
          element={
            isAuthenticated ? <DonorDashboard /> : <Navigate to="/user-login" />
          }
        />
        <Route
          path="/recipient-dashboard/*"
          element={
            isAuthenticated ? (
              <RecipientDashboard />
            ) : (
              <Navigate to="/user-login" />
            )
          }
        />
        <Route index element={<UserLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
