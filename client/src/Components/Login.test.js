import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  const setUserRole = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // ---------------- TEST 1 ----------------
  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login setUserRole={setUserRole} />
      </MemoryRouter>
    );

    // Use role instead of text (avoids duplicate 'Login')
    expect(
      screen.getByRole("heading", { name: "Login" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  // ---------------- TEST 2 ----------------
  test("updates email and password inputs", () => {
    render(
      <MemoryRouter>
        <Login setUserRole={setUserRole} />
      </MemoryRouter>
    );

    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    fireEvent.change(emailInput, {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(emailInput.value).toBe("test@mail.com");
    expect(passwordInput.value).toBe("123456");
  });

  // ---------------- TEST 3 ----------------
  test("logs in successfully and navigates", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        token: "fake-token",
        user: {
          _id: "user123",
          role: "buyer",
        },
      },
    });

    render(
      <MemoryRouter>
        <Login setUserRole={setUserRole} />
      </MemoryRouter>
    );

    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    fireEvent.change(emailInput, {
      target: { value: "buyer@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(localStorage.getItem("token")).toBe("fake-token");
      expect(localStorage.getItem("role")).toBe("buyer");
      expect(setUserRole).toHaveBeenCalledWith("buyer");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  // ---------------- TEST 4 ----------------
  test("shows error message on login failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    });

    render(
      <MemoryRouter>
        <Login setUserRole={setUserRole} />
      </MemoryRouter>
    );

    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    fireEvent.change(emailInput, {
      target: { value: "wrong@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Invalid credentials")
    ).toBeInTheDocument();
  });
});
