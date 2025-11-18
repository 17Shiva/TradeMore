import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sellerDashboard.css';

const SellerDashboard = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleUpload = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      alert("Seller ID missing. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("sellerId", user._id);   // ✅ FIXED HERE
    formData.append("image", product.image);

    try {
      await axios.post('http://localhost:5000/api/products/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert('✅ Product uploaded!');
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err);
      alert("❌ Upload failed.");
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>Upload New Product</h2>
      
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" type="file" onChange={handleChange} />

      <button onClick={handleUpload}>Upload</button>

      <button 
        className="track-btn"
        onClick={() => navigate('/track')}
      >
        📦 Track Orders
      </button>
    </div>
  );
};

export default SellerDashboard;
