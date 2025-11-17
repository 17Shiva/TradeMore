import React, { useEffect, useState } from "react";
import axios from "axios";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const sellerId = user?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/seller/${sellerId}/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error loading seller orders:", err));
  }, []);

  return (
    <div className="seller-orders">
      <h2>📦 Orders Received</h2>

      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <h3>Order ID: {order._id.slice(-6)}</h3>

          <p><b>Buyer:</b> {order.user?.name}</p>
          <p><b>Status:</b> {order.status}</p>

          {order.items.map((item) => (
            <div key={item.productId} className="order-item">
              <img
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.name}
                width="80"
              />
              <div>
                <p><b>{item.name}</b></p>
                <p>Qty: {item.qty}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          ))}

          <p><b>Total Price:</b> ₹{order.totalPrice}</p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
