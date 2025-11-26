import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import DashboardRouter from "./Components/DashboardRouter";
import TrackOrder from "./Components/TrackOrder";

// NEWLY ADDED PAGES
import SellerOrders from "./Components/sellerOrders.js";

import MyProducts from "./Components/MyProducts.js";
import MyOrders from "./Components/MyOrders.js";
import BuyerTrackPage from "./Components/BuyerTrackPage.js";


function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // Keep role synced on refresh/page change
  useEffect(() => {
    const syncRole = () => {
      setUserRole(localStorage.getItem("role") || "");
    };

    syncRole();
    window.addEventListener("storage", syncRole);

    return () => window.removeEventListener("storage", syncRole);
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} />

      {/* NEWS TICKER */}
      <div className="news-ticker">
        <div className="ticker-content">
          🚀 Empowering Global Trade: Real-Time Insights and Seamless Connections
        </div>
      </div>

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* ================= DASHBOARD ================= */}
        <Route path="/dashboard" element={<DashboardRouter userRole={userRole} />} />

        {/* ================= NEW BUYER ROUTES ================= */}
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/track" element={<BuyerTrackPage />} />

        {/* ================= NEW SELLER ROUTES ================= */}
        <Route path="/seller-orders" element={<SellerOrders />} />
        <Route path="/my-products" element={<MyProducts />} />

        {/* ================= 404 PAGE ================= */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", padding: "2rem" }}>
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
