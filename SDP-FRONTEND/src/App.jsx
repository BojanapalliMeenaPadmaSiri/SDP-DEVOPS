// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Auth Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignup from "./pages/admin/AdminSignup";


// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";


// Footer
import Footer from "./components/Footer";

// Layout wrapper to decide when to show Footer
function Layout({ children }) {
  const location = useLocation();

  // List of routes where footer should NOT be shown
  const hideFooterRoutes = [
    "/login/admin",
    "/signup/admin",
    
    "/admin/dashboard",
    
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {children}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin */}
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/signup/admin" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

      
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
