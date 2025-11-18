import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!orders.length) return <h2>No Orders Found</h2>;

  return (
    <div className="orders-list">
      <h2>My Orders</h2>

      {orders.map(order => (
        <div className="order-card" key={order._id}>
          <img
            src={`http://localhost:5000/images/${order.items[0].image}`}
            alt=""
            width="150"
          />

          <h3>{order.items[0].name}</h3>
          <p>Price: ₹{order.items[0].price}</p>
          <p>Status: <b>{order.status}</b></p>

          <Link to={`/track?id=${order._id}`}>
            <button>Track Order</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
