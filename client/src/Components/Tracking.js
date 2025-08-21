import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tracking.css";
import { useLocation } from "react-router-dom";

const Tracking = () => {
  const query = new URLSearchParams(useLocation().search);
  const initialId = query.get('id') || '';
  const [orderId, setOrderId] = useState(initialId);
  const [trackingData, setTrackingData] = useState(null);

  const fetchTrackingInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/tracking/${orderId}`);
      setTrackingData(res.data);
    } catch (err) {
      alert("Tracking info not found");
    }
  };

  useEffect(() => {
    if (orderId) fetchTrackingInfo();
  }, [orderId]);

  return (
    <div className="tracking-container">
      <h2>Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchTrackingInfo}>Track</button>

      {trackingData && (
        <div className="tracking-result">
          <h3>Status: {trackingData.status}</h3>
          <p>Estimated Delivery: {new Date(trackingData.estimatedDelivery).toDateString()}</p>
          <ul>
            {trackingData.history.map((item, index) => (
              <li key={index}>
                <strong>{item.status}</strong> at {item.location} —{" "}
                {new Date(item.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tracking;
