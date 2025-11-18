import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const BuyerTrackPage = () => {
  const [order, setOrder] = useState(null);
  const [params] = useSearchParams();
  const id = params.get("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/buyer/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setOrder(res.data));
  }, []);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div className="track-container">
      <h2>Order Tracking</h2>

      <img
        src={`http://localhost:5000/images/${order.items[0].image}`}
        alt=""
        width="200"
      />

      <h3>{order.items[0].name}</h3>
      <p><b>Current Status:</b> {order.status}</p>

      <h3>Tracking History</h3>

      <ul>
        {order.tracking.map((t, index) => (
          <li key={index}>
            <b>{t.status}</b> – {t.message}
            <br />
            <small>{new Date(t.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyerTrackPage;
