
import React from "react";
import BuyerDashboard from "./BuyerDashboard";
import SellerDashboard from "./SellerDashboard";
import AdminDashboard from "./AdminDashboard";
import { useNavigate } from "react-router-dom";

const DashboardRouter = ({ userRole }) => {
  if (userRole === "buyer") return <BuyerDashboard />;
  if (userRole === "seller") return <SellerDashboard />;
  if (userRole === "admin") return <AdminDashboard />;
  return (
    <h2 style={{ textAlign: "center", padding: "2rem" }}>
      ⚠️ Please log in to access your dashboard.
    </h2>
  );
};

export default DashboardRouter;
