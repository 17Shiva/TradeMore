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
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Access denied" });
  }
  next();
};
