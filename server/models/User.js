import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String, 
  role: {
    type: String,
    enum: ["buyer", "seller", "admin"],
    default: "buyer",
  },
});

export default mongoose.model("User", userSchema);
