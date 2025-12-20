import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BuyerDashboard from "./BuyerDashboard";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    emit: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

beforeAll(() => {
  window.alert = jest.fn();
});

describe("BuyerDashboard Component", () => {

  beforeEach(() => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify({ _id: "buyer123" }));
  });

afterEach(() => {
  localStorage.clear();
});


  test("renders products fetched from API", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{
        _id: "1",
        title: "Laptop",
        description: "Gaming Laptop",
        price: 50000,
        image: "laptop.jpg"
      }]
    });

    render(
      <MemoryRouter>
        <BuyerDashboard />
      </MemoryRouter>
    );

    expect(await screen.findByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.getByText("₹50000")).toBeInTheDocument();
  });

  test("places order when Order Now button is clicked", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{
        _id: "1",
        title: "Phone",
        description: "Smart Phone",
        price: 20000,
        image: "phone.jpg"
      }]
    });

    axios.post.mockResolvedValueOnce({
      data: {
        order: {
          _id: "order123",
          sellerId: "seller123",
          status: "Placed",
          userId: "buyer123"
        }
      }
    });

    render(
      <MemoryRouter>
        <BuyerDashboard />
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText("🛒 Order Now"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test("redirects to login if token is missing", async () => {
    localStorage.removeItem("token");

    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <BuyerDashboard />
      </MemoryRouter>
    );

    expect(screen.queryByText(/order now/i)).toBeNull();
  });
});
