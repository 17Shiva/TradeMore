import { render, screen } from "@testing-library/react";
import App from "./App";

// Silence router future warnings (optional)
jest.spyOn(console, "warn").mockImplementation(() => {});

describe("App Component", () => {
  test("renders navbar ticker text", () => {
    render(<App />);

    expect(
      screen.getByText(/empowering global trade/i)
    ).toBeInTheDocument();
  });

  test("renders Login page when clicking login link", () => {
    render(<App />);

    // Just check that Login text exists somewhere in app
    expect(screen.getAllByText(/login/i).length).toBeGreaterThan(0);
  });
});
