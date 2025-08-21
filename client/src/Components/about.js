import React from "react";
import "./about.css";

export default function AboutUs() {
  const features = [
    "Seamless Buyer & Seller Dashboards",
    "Secure Role-Based Authentication",
    "Real-time Product Upload & Display",
    "Fast Search & Filtering",
    "Scalable with MongoDB Integration",
    "More Features"
  ];

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-title">About Our Project</h2>
        <p className="about-description">
          Our project is designed to simplify the buying and selling process
          with a modern, intuitive platform. It bridges the gap between sellers
          and buyers while ensuring smooth, secure, and fast transactions.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="feature-icon">✅</span> {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
