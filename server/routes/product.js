// import express from "express";
// import multer from "multer";
// import Product from "../models/Product.js";

// const router = express.Router();

// // Setup Multer Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // POST: Upload product
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const { title, description, price, sellerId } = req.body;
//     const image = req.file.filename;

//     const product = new Product({ title, description, price, sellerId, image });
//     await product.save();

//     res.status(201).json({ message: "Product uploaded", product });
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// // Serve image files
// router.use("/images", express.static("uploads"));

// // GET: All products
// router.get("/all", async (req, res) => {
//   const products = await Product.find().sort({ createdAt: -1 });
//   res.json(products);
// });

// export default router;


import express from "express";
import multer from "multer";
import Product from "../models/Product.js";


const router = express.Router();

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST: Upload Product
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, sellerId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const product = new Product({
      title,
      description,
      price,
      sellerId,
      image: req.file.filename, // only filename saved
    });

    await product.save();

    res.status(201).json({ message: "Product uploaded", product });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// GET: All products
router.get("/all", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

export default router;
