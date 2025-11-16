// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const TrackOrder = () => {
// //   const [orderId, setOrderId] = useState('');
// //   const [status, setStatus] = useState(null);
// //   const [newStatus, setNewStatus] = useState('');
// //   const [editing, setEditing] = useState(false);

// //   const fetchStatus = async () => {
// //     try {
// //       const res = await axios.get(`http://localhost:5000/api/track/${orderId}`);
// //       setStatus(res.data.status);
// //     } catch (err) {
// //       setStatus('Not Found');
// //     }
// //   };

// //   const updateStatus = async () => {
// //     try {
// //       const res = await axios.put(`http://localhost:5000/api/track/${orderId}`, {
// //         status: newStatus
// //       });
// //       setStatus(res.data.status);
// //       setEditing(false);
// //     } catch (err) {
// //       alert("Failed to update status");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: "500px", margin: "2rem auto", textAlign: "center" }}>
// //       <h2>📦 Track Your Order</h2>
// //       <input
// //         type="text"
// //         placeholder="Enter Order ID"
// //         value={orderId}
// //         onChange={(e) => setOrderId(e.target.value)}
// //         style={{ padding: "10px", width: "80%" }}
// //       />
// //       <br />
// //       <button onClick={fetchStatus} style={{ marginTop: "1rem" }}>
// //         🔍 Track
// //       </button>

// //       {status && (
// //         <div style={{ marginTop: "2rem" }}>
// //           <h3>Status: <span style={{ color: "green" }}>{status}</span></h3>

// //           {/* Seller can update */}
// //           {editing ? (
// //             <div>
// //               <select onChange={(e) => setNewStatus(e.target.value)} value={newStatus}>
// //                 <option value="">-- Select Status --</option>
// //                 <option value="Processing">Processing</option>
// //                 <option value="Shipped">Shipped</option>
// //                 <option value="Delivered">Delivered</option>
// //               </select>
// //               <button onClick={updateStatus} style={{ marginLeft: "10px" }}>✅ Save</button>
// //             </div>
// //           ) : (
// //             <button onClick={() => setEditing(true)}>✏️ Edit Status</button>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TrackOrder;




// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import './TrackOrder.css'; // optional: add styling

// // // const TrackOrder = () => {
// // //   const [orders, setOrders] = useState([]);

// // // useEffect(() => {
// // //   axios.get('http://localhost:5000/api/track/orders')
// // //     .then(res => {
// // //       console.log("✅ Orders full response:", res.data); // 👀 See this in browser console

// // //       // Determine what structure res.data is:
// // //       if (Array.isArray(res.data)) {
// // //         setOrders(res.data);
// // //       } else if (Array.isArray(res.data.orders)) {
// // //         setOrders(res.data.orders);
// // //       } else {
// // //         console.warn("❗ Unexpected response format:", res.data);
// // //         setOrders([]);
// // //       }
// // //     })
// // //     .catch(err => {
// // //       console.error('❌ Failed to fetch orders', err);
// // //       setOrders([]);
// // //     });
// // // }, []);

// // //   return (
// // //     <div style={{ padding: "2rem" }}>
// // //       <h2>📦 Order Tracking</h2>
// // //       {orders.length === 0 ? (
// // //         <p>No orders found.</p>
// // //       ) : (
// // //         <table style={{ width: "100%", borderCollapse: "collapse" }}>
// // //           <thead>
// // //             <tr style={{ borderBottom: "2px solid black" }}>
// // //               <th>Product</th>
// // //               <th>Buyer</th>
// // //               <th>Status</th>
// // //               <th>Date</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {orders.map(order => (
// // //               <tr key={order._id} style={{ borderBottom: "1px solid #ccc" }}>
// // //                 <td>{order.productName}</td>
// // //                 <td>{order.buyerName}</td>
// // //                 <td>{order.status}</td>
// // //                 <td>{new Date(order.date).toLocaleDateString()}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default TrackOrder;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { socket, connectSocket } from "../utils/socket";

// function TrackOrder({ orderId }) {
//   const [order, setOrder] = useState(null);

//   // 1️⃣ Get userId from localStorage
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   // 2️⃣ Connect socket & join user room
//   useEffect(() => {
//     if (userId) {
//       connectSocket(userId);  // JOIN ROOM: user_<id>
//     }

//     // Listen for real-time updates
//     socket.on("order:update", (data) => {
//       console.log("📡 Live order update:", data);

//       if (data.orderId === orderId) {
//         setOrder((prev) => ({
//           ...prev,
//           status: data.status,
//           tracking: data.tracking,
//         }));
//       }
//     });

//     return () => {
//       socket.off("order:update");
//       socket.disconnect();
//     };
//   }, [userId, orderId]);

//   // 3️⃣ Fetch order details normally
//   useEffect(() => {
//     const fetchOrder = async () => {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         `http://localhost:5000/api/orders/${orderId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOrder(res.data);
//     };
//     fetchOrder();
//   }, [orderId]);

//   return (
//     <div>
//       <h2>Order Tracking</h2>

//       {!order && <p>Loading...</p>}

//       {order && (
//         <>
//           <h3>Status: {order.status}</h3>
//           <ul>
//             {order.tracking.map((t, i) => (
//               <li key={i}>
//                 <strong>{t.status}</strong> — {t.message}
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default TrackOrder;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket, connectSocket } from "../utils/socket";
import { useLocation } from "react-router-dom";

function TrackOrder() {
  const [order, setOrder] = useState(null);

  // Read orderId from URL → /track?id=123
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("id");

  // Get User ID
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // 1️⃣ Connect to socket.io room
  useEffect(() => {
    if (!userId) return;

    connectSocket(userId); // join user_<id> room

    socket.on("order:update", (data) => {
      console.log("📡 Live order update:", data);

      if (data.orderId === orderId) {
        setOrder((prev) => ({
          ...prev,
          status: data.status,
          tracking: data.tracking,
        }));
      }
    });

    return () => {
      socket.off("order:update");
      socket.disconnect();
    };
  }, [userId, orderId]);

  // 2️⃣ Fetch order from correct API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/track/tracking/${orderId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrder(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch order", err);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📦 Order Tracking</h2>

      {!order && <p>Loading order details...</p>}

      {order && (
        <>
          <h3>Status: <strong>{order.status}</strong></h3>

          <h4>Tracking History:</h4>
          <ul>
            {order.tracking.map((t, i) => (
              <li key={i}>
                <strong>{t.status}</strong> – {t.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TrackOrder;
