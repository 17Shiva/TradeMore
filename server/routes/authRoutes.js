// // // import express from "express";
// // // import User from "../models/User.js";

// // // const router = express.Router();

// // // router.post("/login", async (req, res) => {
// // //   const { email, password } = req.body;
// // //   console.log("🔐 Login Request:", email, password);

// // //   try {
// // //     const user = await User.findOne({ email });
// // //     console.log("👤 Found User:", user);

// // //     if (!user || user.password !== password) {
// // //       console.log("❌ Invalid credentials for", email);
// // //       return res.status(401).json({ error: "Invalid credentials" });
// // //     }

// // //     console.log("✅ Login successful for", email);
// // //     return res.json({
// // //       user: {
// // //         username: user.username,
// // //         email: user.email,
// // //         role: user.role
// // //       }
// // //     });
// // //   } catch (err) {
// // //     console.error("💥 Server Error:", err);
// // //     return res.status(500).json({ error: "Server error" });
// // //   }
// // // });

// // // export default router;


// // import express from "express";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";
// // import dotenv from "dotenv";

// // dotenv.config();
// // const router = express.Router();

// // // 🧩 REGISTER
// // router.post("/register", async (req, res) => {
// //   const { username, email, password, role } = req.body;

// //   try {
// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ error: "User already exists" });

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = await User.create({
// //       username,
// //       email,
// //       password: hashedPassword,
// //       role,
// //     });

// //     return res.status(201).json({ message: "User registered successfully" });
// //   } catch (err) {
// //     console.error("❌ Register error:", err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // });

// // // 🔐 LOGIN
// // router.post("/login", async (req, res) => {
// //   const { email, password } = req.body;
// //   console.log("🔐 Login Request:", email);

// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(401).json({ error: "Invalid credentials" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

// //     // ✅ Generate JWT token
// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     console.log("✅ Login successful for", email);
// //     return res.json({
// //       token,
// //       user: {
// //         username: user.username,
// //         email: user.email,
// //         role: user.role,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("💥 Server Error:", err);
// //     return res.status(500).json({ error: "Server error" });
// //   }
// // });


// // export default router;


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     token = authHeader.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // attach user without password
//     req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) return res.status(401).json({ message: "User not found" });
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };

// // role based middleware factory
// export const authorize = (...allowedRoles) => (req, res, next) => {
//   if (!req.user) return res.status(401).json({ message: "Not authorized" });
//   if (!allowedRoles.includes(req.user.role)) {
//     return res.status(403).json({ message: "Forbidden: insufficient rights" });
//   }
//   next();
// };

import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,   
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
