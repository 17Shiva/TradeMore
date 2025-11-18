import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const BuyerOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [params] = useSearchParams();
  const token = localStorage.getItem("token");

  const orderId = params.get("id");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/buyer/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-details">
      <h2>Order Details</h2>

      <img
        src={`http://localhost:5000/images/${order.items[0].image}`}
        alt=""
        width="180"
      />

      <h3>{order.items[0].name}</h3>
      <p>Price: ₹{order.items[0].price}</p>
      <p>Status: <b>{order.status}</b></p>

      <h3>Tracking</h3>
      <ul>
        {order.tracking.map((t, i) => (
          <li key={i}>
            <b>{t.status}</b> - {t.message} <br />
            <small>{new Date(t.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyerOrderDetails;
