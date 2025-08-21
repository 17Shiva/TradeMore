// src/Components/Navbar.js
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">TradeMore</div>
      <div className="pages">
        <Link to="/">Home</Link>
        <Link to="/buyer">BuyerDashboard</Link>
        <Link to="/seller">SellerDashboard</Link>
        <Link to="/track">Track </Link>
        <Link to="/login">Login</Link>


      </div>
    </nav>
  );
}

export default Navbar;
