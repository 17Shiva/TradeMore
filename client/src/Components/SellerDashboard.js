import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import

const SellerDashboard = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: null
  });

  const navigate = useNavigate(); // ✅ You missed this line

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("sellerId", "SELLER123");
    formData.append("image", product.image);

    try {
      await axios.post('http://localhost:5000/api/products/upload', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert('✅ Product uploaded!');
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed.");
    }
  };

  return (
    <div>
      <h2>Upload New Product</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      
      <button onClick={() => navigate('/track')} style={{ marginTop: '1rem' }}>
        📦 Track Orders
      </button>
    </div>
  );
};

export default SellerDashboard;
