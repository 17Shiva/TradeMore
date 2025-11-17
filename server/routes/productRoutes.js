import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// ----------------------------
// MULTER STORAGE (uploads/products)
// ----------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/"); // Products folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ----------------------------
// POST: UPLOAD PRODUCT
// ----------------------------
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, category, sellerId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      sellerId,
      image: req.file.filename, // Save filename only
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product uploaded",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ----------------------------
// SERVE PRODUCT IMAGES
// ----------------------------
router.use(
  "/images",
  express.static("uploads/products")
);

// ----------------------------
// GET: All PRODUCTS
// ----------------------------
router.get("/all", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// ----------------------------
// GET: SELLER PRODUCTS
// ----------------------------
router.get("/seller/:sellerId", async (req, res) => {
  const sellerId = req.params.sellerId;
  const products = await Product.find({ sellerId }).sort({ createdAt: -1 });
  res.json(products);
});

export default router;
