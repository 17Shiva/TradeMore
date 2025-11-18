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

        {/* ==================== BUYER LINKS ==================== */}
        {role === "buyer" && (
          <>
            <Link to="/dashboard">Buyer Dashboard</Link>
            {/*<Link to="/my-orders">My Orders</Link>*/} 
            
          </>
        )}

        {/* ==================== SELLER LINKS ==================== */}
        {role === "seller" && (
          <>
            <Link to="/dashboard">Seller Dashboard</Link>
            <Link to="/seller-orders">Orders</Link>       {/* NEW */}
          </>
        )}

        {/* ==================== ADMIN LINKS ==================== */}
        {role === "admin" && (
          <>
            <Link to="/dashboard">Admin Dashboard</Link>
          </>
        )}

        {/* ==================== LOGIN / LOGOUT ==================== */}
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
