// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import "./SellerOrders.css";

// const SellerOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const seller = JSON.parse(localStorage.getItem("user"));
//   const sellerId = seller?._id;

//   console.log("🔥 Current orders:", orders);

//   // 1) Create single socket instance
//   useEffect(() => {
//     const s = io("http://localhost:5000");
//     setSocket(s);
//     return () => s.disconnect();
//   }, []);

//   // 2) Fetch initial orders
//   useEffect(() => {
//     if (!sellerId) return;

//     axios
//       .get(`http://localhost:5000/api/orders/seller/${sellerId}`)
//       .then((res) => setOrders([...res.data].reverse()))
//       .catch((err) => console.error(err));
//   }, [sellerId]);

//   // 3) Live updates
//   useEffect(() => {
//     if (!socket || !sellerId) return;

//     console.log("🟦 sellerId =", sellerId);
//     console.log("🟦 Joining room:", `seller_${sellerId}`);
//     socket.emit("join", `seller_${sellerId}`);

//     const onOrderUpdate = (data) => {
//       console.log("🔴 Live update received:", data);

//       setOrders((prev) => {
//         const exists = prev.some(
//           (o) => o._id.toString() === data.orderId.toString()
//         );

//         if (exists) {
//           return prev.map((order) =>
//             order._id.toString() === data.orderId.toString()
//               ? { ...order, status: data.status }
//               : order
//           );
//         }

//         const newOrder = {
//           _id: data.orderId,
//           status: data.status,
//           user: data.userId,
//           items: [],
//         };

//         console.log("🆕 NEW ORDER ADDED:", newOrder);
//         return [newOrder, ...prev];
//       });
//     };

//     socket.on("order:update", onOrderUpdate);
//     return () => socket.off("order:update", onOrderUpdate);
//   }, [socket, sellerId]);

//   // 4) Seller updates status
//   const updateStatus = async (id, status) => {
//     await axios.put(
//       `http://localhost:5000/api/orders/update-status/${id}`,
//       { status }
//     );
//   };

//   if (!orders.length) return <h2>No Orders Yet</h2>;

//   return (
//     <div className="seller-orders">
//       <h2>Customer Orders</h2>

// <<<<<<< HEAD
//       {orders.map((order) => (
// =======
//       {orders.map(order => {
//        console.log('order at render:', order);
//        return(
// >>>>>>> 4e5ba6a (Working stable code)
//         <div className="order-card" key={order._id}>
//           <h3>{order.items?.[0]?.name || "Item"}</h3>
//           <p>Buyer ID: {order.user}</p>
//           <p>Status: {order.status}</p>

//           <button onClick={() => updateStatus(order._id, "Processing")}>
//             Processing
//           </button>
//           <button onClick={() => updateStatus(order._id, "Shipped")}>
//             Shipped
//           </button>
//           <button onClick={() => updateStatus(order._id, "Delivered")}>
//             Delivered
//           </button>
//         </div>
//       )})}
//     </div>
//   );
// };

// export default SellerOrders;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./SellerOrders.css";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);
  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerId = seller?._id;

  // 1) Create single socket instance
  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);
    return () => s.disconnect();
  }, []);

  // 2) Fetch initial orders
  useEffect(() => {
    if (!sellerId) return;

    axios
      .get(`http://localhost:5000/api/orders/seller/${sellerId}`)
      .then((res) => setOrders([...res.data].reverse()))
      .catch((err) => console.error(err));
  }, [sellerId]);

  // 3) Live updates
  useEffect(() => {
    if (!socket || !sellerId) return;

    socket.emit("join", `seller_${sellerId}`);

    const onOrderUpdate = (data) => {
      setOrders((prev) => {
        const exists = prev.some(
          (o) => o._id.toString() === data.orderId.toString()
        );

        if (exists) {
          return prev.map((order) =>
            order._id.toString() === data.orderId.toString()
              ? { ...order, status: data.status }
              : order
          );
        }

        return [
          {
            _id: data.orderId,
            status: data.status,
            user: data.userId,
            items: [],
          },
          ...prev,
        ];
      });
    };

    socket.on("order:update", onOrderUpdate);
    return () => socket.off("order:update", onOrderUpdate);
  }, [socket, sellerId]);

  // 4) Seller updates status
  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/orders/update-status/${id}`,
      { status }
    );
  };

  if (!orders.length) return <h2>No Orders Yet</h2>;

  return (
    <div className="seller-orders">
      <h2>Customer Orders</h2>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <h3>{order.items?.[0]?.name || "Item"}</h3>
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
