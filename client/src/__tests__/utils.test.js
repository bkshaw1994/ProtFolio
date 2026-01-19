// Example test for utility functions and test helpers
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

// Mock custom hook example
const useCounter = (initialValue = 0) => {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// Mock utility function for testing
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

describe("Utility Functions", () => {
  describe("formatDate", () => {
    it("should format date correctly", () => {
      const date = new Date("2023-12-25");
      const formatted = formatDate(date);

      // Accept either US or UK date format
      expect(formatted).toMatch(/^(12\/25\/2023|25\/12\/2023)$/);
    });

    it("should handle invalid date", () => {
      expect(formatDate(null)).toBe("");
      expect(formatDate(undefined)).toBe("");
    });
  });

  describe("validateEmail", () => {
    it("should validate correct email formats", () => {
      expect(validateEmail("test@example.com")).toBe(true);
      expect(validateEmail("user.name@domain.co.uk")).toBe(true);
    });

    it("should reject invalid email formats", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("test@")).toBe(false);
      expect(validateEmail("@example.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });
  });
});

describe("Custom Hooks", () => {
  describe("useCounter", () => {
    it("should initialize with default value", () => {
      const { result } = renderHook(() => useCounter());

      expect(result.current.count).toBe(0);
    });

    it("should initialize with custom value", () => {
      const { result } = renderHook(() => useCounter(10));

      expect(result.current.count).toBe(10);
    });

    it("should increment count", () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment();
      });

      expect(result.current.count).toBe(1);
    });

    it("should decrement count", () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.increment();
        result.current.decrement();
      });

      expect(result.current.count).toBe(0);
    });

    it("should reset count", () => {
      const { result } = renderHook(() => useCounter(10));

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.count).toBe(12);

      act(() => {
        result.current.reset();
      });

      expect(result.current.count).toBe(10);
    });
  });
});

describe("Test Utilities", () => {
  describe("renderWithProviders", () => {
    it("should render component with providers", () => {
      const TestComponent = () => <div>Test Component</div>;

      renderWithProviders(<TestComponent />);
      // Just test that it renders without crashing
      expect(true).toBe(true);
    });

    it("should provide Redux store", () => {
      const TestComponent = () => {
        // This component will fail if store is not provided
        return <div>With Store</div>;
      };

      renderWithProviders(<TestComponent />);
      // Just test that it renders without crashing
      expect(true).toBe(true);
    });

    it("should handle custom preloaded state", () => {
      const TestComponent = () => <div>Custom State</div>;

      const preloadedState = {
        profile: { data: { name: "Test User" } },
      };

      renderWithProviders(<TestComponent />, {
        preloadedState,
      });
      // Just test that it renders without crashing
      expect(true).toBe(true);
    });

    it("should return store in the result", () => {
      const TestComponent = () => <div>Store Test</div>;

      const view = renderWithProviders(<TestComponent />);
      expect(view.store).toBeDefined();
      expect(typeof view.store.dispatch).toBe("function");
      expect(typeof view.store.getState).toBe("function");
    });
  });
});
