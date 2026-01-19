// Jest setup for React client tests
import "@testing-library/jest-dom";

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Global test utilities
global.testUtils = {
  // Helper to render component with providers
  createMockStore: () => ({
    getState: jest.fn(() => ({
      profile: { data: null, loading: false, error: null },
      projects: { data: [], loading: false, error: null },
      skills: { data: [], loading: false, error: null },
      experience: { data: [], loading: false, error: null },
    })),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }),

  // Helper to create mock router props
  createMockRouterProps: () => ({
    history: {
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
    },
    location: {
      pathname: "/",
      search: "",
      hash: "",
      state: null,
    },
    match: {
      params: {},
      isExact: true,
      path: "/",
      url: "/",
    },
  }),
};

// Suppress console.error for cleaner test output
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: ReactDOM.render is no longer supported")
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock @reduxjs/toolkit/query/react
jest.mock("@reduxjs/toolkit/query/react", () => ({
  createApi: jest.fn(() => ({
    reducerPath: "api",
    reducer: jest.fn(),
    middleware: jest.fn(),
    endpoints: {},
  })),
  fetchBaseQuery: jest.fn(() => jest.fn()),
}));
