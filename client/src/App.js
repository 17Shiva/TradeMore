// // import React, { useState, useEffect } from 'react';
// // import './App.css';
// // import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// // import Tracking from './Components/Tracking';
// // import Navbar from './Components/Navbar';
// // import Home from './Components/Home';
// // import BuyerDashboard from './Components/BuyerDashboard';
// // import SellerDashboard from './Components/SellerDashboard';
// // import AdminDashboard from './Components/AdminDashboard';
// // import Login from './Components/Login';
// // import Contact from './Components/Contact';
// // import Footer from './Components/Footer';

// // function App() {
// //   const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

// //   useEffect(() => {
// //     // Sync localStorage on mount
// //     const storedRole = localStorage.getItem('role');
// //     if (storedRole) {
// //       setUserRole(storedRole);
// //     }
// //   }, []);

// //   return (
// //     <Router>
// //       <Navbar />

// //       {/* 🔽 News Ticker (optional) */}
// //       <div className="news-ticker">
// //         <div className="ticker-content">
// //           🚀 Empowering Global Trade: Real-Time Insights and Seamless Connections
// //         </div>
// //       </div>

// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/contact" element={<Contact />} />
// //         <Route path="/track" element={<Tracking />} />


// //         {/* Login route */}
// //         <Route path="/login" element={<Login setUserRole={setUserRole} />} />

// //         {/* Role-Based Dashboard */}
// //         {userRole === 'buyer' && (
// //           <Route path="/dashboard" element={<BuyerDashboard />} />
// //         )}
// //         {userRole === 'seller' && (
// //           <Route path="/dashboard" element={<SellerDashboard />} />
// //         )}
// //         {userRole === 'admin' && (
// //           <Route path="/dashboard" element={<AdminDashboard />} />
// //         )}

// //         {/* Unauthorized access to /dashboard */}
// //         {userRole === '' && (
// //           <Route
// //             path="/dashboard"
// //             element={<h2 style={{ textAlign: 'center', padding: '2rem' }}>⚠️ Please log in to access your dashboard.</h2>}
// //           />
// //         )}

// //         {/* 404 fallback */}
// //         <Route path="*" element={<h2 style={{ textAlign: 'center', padding: '2rem' }}>404 - Page Not Found</h2>} />
// //       </Routes>

// //       <Footer />
// //     </Router>
// //   );
// // }

// // export default App;






// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from "./Components/Register";
// import Navbar from './Components/Navbar';
// import Footer from './Components/Footer';
// import Home from './Components/Home';
// import Contact from './Components/Contact';
// import Login from './Components/Login';
// import DashboardRouter from './Components/DashboardRouter'; // 🔽 New component
// import TrackOrder from "./Components/TrackOrder";
// import NewsSection from "./Components/NewsSection"; 


// function App() {
//   const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

//   useEffect(() => {
//     const storedRole = localStorage.getItem('role');
//     if (storedRole) {
//       setUserRole(storedRole);
//     }
//   }, []);

//   return (
//     <Router>
//       <Navbar />

//       <div className="news-ticker">
//         <div className="ticker-content">
//           🚀 Empowering Global Trade: Real-Time Insights and Seamless Connections
//         </div>
//       </div>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login setUserRole={setUserRole} />} />
//         <Route path="/dashboard" element={<DashboardRouter userRole={userRole} />} />
//         <Route path="/track" element={<TrackOrder />} />

//         <Route
//           path="*"
//           element={
//             <h2 style={{ textAlign: 'center', padding: '2rem' }}>
//               404 - Page Not Found
//             </h2>
//           }
//         />
//         <Route path="/register" element={<Register />} />

//       </Routes>

//       <Footer />
//     </Router>
//   );
// }

// export default App;


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
// import NewsSection from "./Components/NewsSection";
import SellerOrders from "./Components/sellerOrders";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");

  // 🔥 FIX: Make login persistent even after page change or refresh
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

      {/* News Ticker */}
      <div className="news-ticker">
        <div className="ticker-content">
          🚀 Empowering Global Trade: Real-Time Insights and Seamless Connections
        </div>
      </div>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/track" element={<TrackOrder />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardRouter userRole={userRole} />}
        />
      <Route path="/sellerOrders" element={<SellerOrders />} />
        {/* 404 fallback */}
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
