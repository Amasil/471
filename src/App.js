import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

const Navigation = () => {
  const homeIconUrl = "https://img.icons8.com/ios/50/000000/home.png";

  return (
    <div className="topnav">
      <Link to="/" className="home">
        <img src={homeIconUrl} alt="Home" />
      </Link>
      <Link to="/login-doctor">Doctor Login</Link>
      <Link to="/login-admin">Admin Login</Link>
    </div>
  );
};

const setDocumentAttributes = (title, faviconHref) => {
  document.title = title;

  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    faviconLink.href = faviconHref;
  }
};

const LoginForm = () => {
  useEffect(() => {
    setDocumentAttributes(
      "Login",
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/user-239-95852.png?f=webp&w=256"
    );
  }, []);
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form action="#" method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const DoctorLogin = () => {
  useEffect(() => {
    setDocumentAttributes(
      "Doctor Login",
      "https://cdn.iconscout.com/icon/free/png-512/free-doctor-2315657-1921402.png?f=webp&w=256"
    );
  }, []);
  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      <form action="#" method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const AdminLogin = () => {
  useEffect(() => {
    setDocumentAttributes(
      "Admin Login",
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/admin-2058043-1747996.png?f=webp&w=256"
    );
  }, []);
  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form action="#" method="post">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="*" element={<LoginForm />} />
        <Route path="/login-doctor" element={<DoctorLogin />} />
        <Route path="/login-admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
