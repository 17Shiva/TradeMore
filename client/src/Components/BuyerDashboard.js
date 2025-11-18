// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './BuyerDashboard.css';
// import { useNavigate } from 'react-router-dom';

// const BuyerDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const buyerId = localStorage.getItem('userId'); // must be saved at login

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/products/all')
//       .then(res => setProducts(res.data));
//   }, []);

//   const placeOrder = async (productId) => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/orders/place', {
//         buyerId,
//         productId,
//         quantity: 1
//       });

//       alert('✅ Order placed successfully!');
//       navigate(`/track?id=${res.data.orderId}`);
//     } catch (err) {
//       console.error(err);
//       alert('❌ Failed to place order.');
//     }
//   };

//   return (
//     <div className="product-grid">
//       {products.map(p => (
//         <div className="product-card" key={p._id}>
//           <img
//             src={`http://localhost:5000/api/products/images/${p.image}`}
//             alt={p.title}
//           />
//           <h3>{p.title}</h3>
//           <p>{p.description}</p>
//           <p><strong>₹{p.price}</strong></p>
//           <button onClick={() => placeOrder(p._id)}>🛒 Order Now</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BuyerDashboard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuyerDashboard.css';
import { useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Fetch all products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  // Place order
  const placeOrder = async (productId) => {
    try {
      if (!token) {
        alert("Please login first!");
        navigate("/login");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/orders/place",
        {
          productId,
          quantity: 1
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("✅ Order placed successfully!");
      // navigate(`/track?id=${res.data.orderId}`);

    }  catch (err) {
  console.error("SERVER ERROR:", err.response?.data || err);
  alert("Failed to place order");
}

    
  };

  return (
    <div className="product-grid">
      {products.map(p => (
        <div className="product-card" key={p._id}>
<img 
  src={`http://localhost:5000/images/${p.image}`}
  alt={p.title}
/>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p><strong>₹{p.price}</strong></p>

          <button onClick={() => placeOrder(p._id)}>
            🛒 Order Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuyerDashboard;
