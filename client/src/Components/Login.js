// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";
// import {
//   FaUserCircle,
//   FaEye,
//   FaEyeSlash,
//   FaGoogle,
//   FaFacebook,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = ({ setUserRole }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       const role = res.data.user.role;
//       localStorage.setItem("role", role);
//       setUserRole(role);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("❌ Invalid credentials. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <FaUserCircle className="profile-icon" />
//         <h2>Welcome</h2>

//         <div className="input-group">
//           <input
//             type="email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//           <label>Email</label>
//         </div>

//         <div className="input-group password-group">
//           <input
//             type={showPass ? "text" : "password"}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           <label>Password</label>
//           <span className="toggle-icon" onClick={() => setShowPass(!showPass)}>
//             {showPass ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button onClick={handleLogin}>Login</button>

//         <div className="social-login">
//           <p>or login with</p>
//           <div className="social-icons">
//             <FaGoogle className="google" />
//             <FaFacebook className="facebook" />
//           </div>
//         </div>

//         <p className="register-link">
//           Don’t have an account? <a href="/register">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUserRole }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      const { token, user } = res.data;

      // Save details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // Update App.js role state
      setUserRole(user.role);

      // Redirect to dashboard based on role
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

