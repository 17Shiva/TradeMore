import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SellerDashboard from "./SellerDashboard";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

// ---------------- MOCKS ----------------
jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeAll(() => {
  window.alert = jest.fn();
});

// ---------------- TEST SUITE ----------------
describe("SellerDashboard Component", () => {

  beforeEach(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ _id: "seller123" })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // ---------------- TEST 1 ----------------
  test("renders seller dashboard inputs and buttons", () => {
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("Upload New Product")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("📦 Track Orders")).toBeInTheDocument();
  });

  // ---------------- TEST 2 ----------------
  test("updates input values correctly", () => {
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { name: "title", value: "Laptop" },
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { name: "description", value: "Gaming Laptop" },
    });

    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { name: "price", value: "50000" },
    });

    expect(screen.getByPlaceholderText("Title").value).toBe("Laptop");
    expect(screen.getByPlaceholderText("Description").value).toBe("Gaming Laptop");
    expect(screen.getByPlaceholderText("Price").value).toBe("50000");
  });

  // ---------------- TEST 3 ----------------
 test("uploads product successfully", async () => {
  axios.post.mockResolvedValueOnce({ data: {} });

  render(
    <MemoryRouter>
      <SellerDashboard />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Title"), {
    target: { name: "title", value: "Phone" },
  });

  fireEvent.change(screen.getByPlaceholderText("Description"), {
    target: { name: "description", value: "Smart Phone" },
  });

  fireEvent.change(screen.getByPlaceholderText("Price"), {
    target: { name: "price", value: "20000" },
  });

  // ✅ FIX: correctly select file input
  const fileInput = document.querySelector('input[type="file"]');
  const file = new File(["dummy"], "phone.jpg", { type: "image/jpg" });

  fireEvent.change(fileInput, {
    target: { files: [file] },
  });

  fireEvent.click(screen.getByText("Upload"));

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("✅ Product uploaded!");
  });
});


  // ---------------- TEST 4 ----------------
  test("shows alert if seller ID is missing", async () => {
    localStorage.removeItem("user");

    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Upload"));

    expect(window.alert).toHaveBeenCalledWith(
      "Seller ID missing. Please login again."
    );
  });

  // ---------------- TEST 5 ----------------
  test("navigates to track orders page", () => {
    render(
      <MemoryRouter>
        <SellerDashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("📦 Track Orders"));

    expect(mockNavigate).toHaveBeenCalledWith("/track");
  });
});
