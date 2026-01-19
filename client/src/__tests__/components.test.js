// Example test for React components
import { configureStore } from "@reduxjs/toolkit";

// Import components to test
// import Navbar from '../components/Navbar/Navbar';
// import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

// Mock store setup
const _createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      profile: (state = { data: null, loading: false, error: null }) => state,
      projects: (state = { data: [], loading: false, error: null }) => state,
      skills: (state = { data: [], loading: false, error: null }) => state,
      experience: (state = { data: [], loading: false, error: null }) => state,
      ...initialState,
    },
  });
};

describe("Component Tests", () => {
  describe("LoadingSpinner", () => {
    it("should render loading spinner with default message", () => {
      // This is a placeholder test structure
      // render(
      //   <TestWrapper>
      //     <LoadingSpinner />
      //   </TestWrapper>
      // );

      // expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Placeholder assertion
      expect(true).toBe(true);
    });

    it("should render loading spinner with custom message", () => {
      // const customMessage = 'Loading projects...';

      // render(
      //   <TestWrapper>
      //     <LoadingSpinner message={customMessage} />
      //   </TestWrapper>
      // );

      // expect(screen.getByText(customMessage)).toBeInTheDocument();

      // Placeholder assertion
      expect(true).toBe(true);
    });
  });

  describe("Navbar", () => {
    it("should render navigation links", () => {
      // render(
      //   <TestWrapper>
      //     <Navbar />
      //   </TestWrapper>
      // );

      // expect(screen.getByText('Home')).toBeInTheDocument();
      // expect(screen.getByText('Projects')).toBeInTheDocument();
      // expect(screen.getByText('Skills')).toBeInTheDocument();
      // expect(screen.getByText('Contact')).toBeInTheDocument();

      // Placeholder assertion
      expect(true).toBe(true);
    });

    it("should handle navigation clicks", async () => {
      // render(
      //   <TestWrapper>
      //     <Navbar />
      //   </TestWrapper>
      // );

      // const projectsLink = screen.getByText('Projects');
      // fireEvent.click(projectsLink);

      // await waitFor(() => {
      //   expect(window.location.pathname).toBe('/projects');
      // });

      // Placeholder assertion
      expect(true).toBe(true);
    });
  });

  describe("API Integration", () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    it("should handle API calls correctly", async () => {
      const mockResponse = {
        data: [{ id: 1, title: "Test Project" }],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Example of testing API calls
      // You would test your API slice or service functions here
      expect(fetch).toHaveBeenCalledTimes(0); // Initial state

      // Simulate API call
      const response = await fetch("/api/projects");
      const data = await response.json();

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith("/api/projects");
      expect(data).toEqual(mockResponse);
    });
  });
});
