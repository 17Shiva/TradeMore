import axios from "axios";
import React, { useEffect, useState } from "react";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerId = seller?._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/seller/${sellerId}`)
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>My Products</h2>

      {products.map(p => (
        <div key={p._id} className="product-card">
          <img src={`http://localhost:5000/images/${p.image}`} width="150" />
          <h3>{p.title}</h3>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
