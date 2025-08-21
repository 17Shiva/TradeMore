import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
        <div>
            <p>&copy; {new Date().getFullYear()} TradeMore. All rights reserved.</p>
        </div>
        <div>
           <Link to="/contact" className="contact-fab">
            Contact
          </Link>

        </div>
      
    </footer>
  );
}

export default Footer;