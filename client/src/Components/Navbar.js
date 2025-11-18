// // import './Navbar.css';
// // import { Link } from 'react-router-dom';
// // import { useEffect, useState } from 'react';

// // function Navbar() {
// //   const [role, setRole] = useState(localStorage.getItem("role") || "");

// //   useEffect(() => {
// //     setRole(localStorage.getItem("role"));
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("role");
// //     localStorage.removeItem("user");

// //     setRole("");
// //     window.location.href = "/login";
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="logo">TradeMore</div>

// //       <div className="pages">
// //         <Link to="/">Home</Link>
// //         <Link to="/track">Track</Link>

// //         {/* If user is logged in → show Dashboard + Logout */}
// //         {role ? (
// //           <>
// //             <Link to="/dashboard">Dashboard</Link>
// //             <button 
// //               onClick={handleLogout} 
// //               style={{ marginLeft: "10px", cursor: "pointer" }}
// //             >
// //               Logout
// //             </button>
// //           </>
// //         ) : (
// //           /* If user not logged in → show Login + Register */
// //           <>
// //             <Link to="/login">Login</Link>
// //             <Link to="/register">Register</Link>
// //           </>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;




// import './Navbar.css';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';

// function Navbar() {
//   const role = localStorage.getItem("role");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">TradeMore</div>

//       <div className="pages">
//         <Link to="/">Home</Link>
//         <Link to="/track">Track</Link>

//         {/* --------------------------
//             ROLE-BASED DASHBOARD LINKS
//         ---------------------------- */}
//         {role === "buyer" && <Link to="/dashboard">Buyer Dashboard</Link>}
//         {role === "seller" && <Link to="/dashboard">Seller Dashboard</Link>}
//         {role === "admin" && <Link to="/dashboard">Admin Dashboard</Link>}

//         {/* --------------------------
//             LOGIN / LOGOUT LINKS
//         ---------------------------- */}
//         {role ? (
//           <button
//             onClick={handleLogout}
//             style={{
//               marginLeft: "10px",
//               cursor: "pointer",
//               background: "none",
//               border: "none",
//               color: "white",
//             }}
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import './Navbar.css';
// import { Link } from 'react-router-dom';

// function Navbar({ userRole }) {

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">TradeMore</div>

//       <div className="pages">
//         <Link to="/">Home</Link>
//         <Link to="/track">Track</Link>

//         {/* -------- ROLE BASED DASHBOARD -------- */}
//         {userRole === "buyer" && <Link to="/dashboard">Buyer Dashboard</Link>}
//         {userRole === "seller" && <Link to="/dashboard">Seller Dashboard</Link>}
//         {userRole === "admin" && <Link to="/dashboard">Admin Dashboard</Link>}

//         {/* ------------ LOGIN / LOGOUT ----------- */}
//         {!userRole ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             style={{
//               marginLeft: "10px",
//               cursor: "pointer",
//               background: "none",
//               border: "none",
//               color: "white"
//             }}
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">TradeMore</div>

      <div className="pages">
        <Link to="/">Home</Link>
         

        {/* ============ ROLE-BASED LINKS ============ */}
        
        {role === "buyer" && (
          <>
            <Link to="/dashboard">Buyer Dashboard</Link>
          </>
        )}

        {role === "seller" && (
          <>
            <Link to="/dashboard">Seller Dashboard</Link>
            
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/dashboard">Admin Dashboard</Link>
          </>
        )}

        {/* ========= LOGIN / LOGOUT ========= */}
        {!role ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: "white"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
