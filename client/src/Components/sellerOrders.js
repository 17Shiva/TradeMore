import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerOrders.css";
const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerId = seller?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/seller/${sellerId}`)
      .then(res => setOrders(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/orders/update-status/${id}`, {
      status,
      message: `${status} by seller`
    });

    alert("Status Updated");
    window.location.reload();
  };

  if (!orders.length) return <h2>No Orders Yet</h2>;

  return (
    <div className="seller-orders">
      <h2>Customer Orders</h2>

      {orders.map(order => (
        <div className="order-card" key={order._id}>
          <h3>{order.items[0].name}</h3>
          <p>Buyer ID: {order.user}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Processing")}>
            Processing
          </button>
          <button onClick={() => updateStatus(order._id, "Shipped")}>
            Shipped
          </button>
          <button onClick={() => updateStatus(order._id, "Delivered")}>
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;


