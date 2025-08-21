// src/components/Home.js

import './Home.css'; // Import CSS file
import AboutUs from './about';
import bg from '../assests/images/TradeMoreBG.png'; // fix spelling & add extension
const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${bg})` }}>
        <h1>Trade Smarter. Trade More.</h1>
        <p>Your one-stop platform for seamless trading experiences.</p>
        <button>Get Started</button>
      </section>


     {/* Features Section */}
<section className="features">
  <h2>Why Choose Us</h2>
  <div className="feature-list">
    {[
      {
        icon: '🚀',
        title: 'Fast Execution',
        desc: 'Lightning-fast trade processing and real-time execution.'
      },
      {
        icon: '🔒',
        title: 'Secure & Private',
        desc: 'End-to-end encryption and strong data privacy policies.'
      },
      {
        icon: '📈',
        title: 'Real-Time Analytics',
        desc: 'Live charts and market data to help you make smart decisions.'
      },
      {
        icon: '🤝',
        title: '24/7 Support',
        desc: 'Always-on human support whenever you need help.'
      },
      {
        icon: '💳',
        title: 'Trusted Transactions',
        desc: 'PCI-DSS compliant payment gateways and fraud detection.'
      },
{
  icon: '🛡️',
  title: 'Escrow Payments',
  desc: 'We hold funds safely until both buyer and seller confirm fulfillment.'
}
    ].map((feature, index) => (
      <div className="feature-card" key={index}>
        <div className="feature-icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    ))}
  </div>
</section>
    <div>
      <AboutUs />
    </div>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to boost your trading?</h2>
        <button>Join Now</button>
      </section>

      {/* Footer */}
     {/* <footer className="footer">
          © 2025 TradeMore Inc. • Privacy Policy • Terms of Service
      </footer> */}
    </div>
  );
};

export default Home;