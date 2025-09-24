import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../landing.css";

function Navbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);

  // Check user role from localStorage
  const userRole = localStorage.getItem("userRole"); // "admin" | "faculty" | "student" | "parent"

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    window.location.href = "/"; // Simple redirect
  };

  return (
    <nav className="navbar">
      <div className="logo">Skill Track</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* Show Login/Signup only if NOT logged in */}
        {!userRole && (
          <>
            {/* Login Dropdown */}
            <div className="dropdown">
              <span
                className="dropdown-btn"
                onClick={() => setLoginOpen(!loginOpen)}
              >
                Login ▾
              </span>
              {loginOpen && (
                <div className="dropdown-menu">
                  <Link to="/login/admin">Admin</Link>
                  <Link to="/login/faculty">Faculty</Link>
                  <Link to="/login/student">Student</Link>
                  <Link to="/login/parent">Parent</Link>
                </div>
              )}
            </div>

            {/* Signup Dropdown */}
            <div className="dropdown">
              <span
                className="dropdown-btn"
                onClick={() => setSignupOpen(!signupOpen)}
              >
                Signup ▾
              </span>
              {signupOpen && (
                <div className="dropdown-menu">
                  <Link to="/signup/admin">Admin</Link>
                  <Link to="/signup/faculty">Faculty</Link>
                  <Link to="/signup/student">Student</Link>
                  <Link to="/signup/parent">Parent</Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Dashboards Dropdown */}
        <div className="dropdown">
          <span
            className="dropdown-btn"
            onClick={() => setDashOpen(!dashOpen)}
          >
            Dashboards ▾
          </span>
          {dashOpen && (
            <div className="dropdown-menu">
              <Link to="/admin/dashboard">Admin</Link>
              <Link to="/faculty/dashboard">Faculty</Link>
              <Link to="/student/dashboard">Student</Link>
              <Link to="/parent/dashboard">Parent</Link>
            </div>
          )}
        </div>

        {/* If logged in, show logout */}
        {userRole && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout ({userRole})
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;