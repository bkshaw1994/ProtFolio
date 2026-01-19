// Example test for GitHub service
const githubService = require("../services/githubService");

// Mock axios for testing
jest.mock("axios");
const axios = require("axios");

describe("GitHub Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserRepositories", () => {
    it("should fetch repositories successfully", async () => {
      // Mock API response
      const mockRepos = [
        {
          id: 1,
          name: "test-repo",
          description: "Test repository",
          html_url: "https://github.com/user/test-repo",
          language: "JavaScript",
          stargazers_count: 10,
          forks_count: 5,
          created_at: "2023-01-01T00:00:00Z",
          updated_at: "2023-12-01T00:00:00Z",
        },
      ];

      axios.get.mockResolvedValue({ data: mockRepos });

      const result = await githubService.getUserRepositories();

      expect(axios.get).toHaveBeenCalledWith(
        "https://api.github.com/users/bkshaw1994/repos",
        expect.objectContaining({
          params: expect.objectContaining({
            page: 1,
            per_page: 30,
            sort: "updated",
            direction: "desc",
          }),
        })
      );
      expect(result).toEqual(mockRepos);
    });

    it("should handle API errors gracefully", async () => {
      axios.get.mockRejectedValue(new Error("API Error"));

      await expect(githubService.getUserRepositories()).rejects.toThrow(
        "API Error"
      );
    });
  });

  describe("categorizeRepository", () => {
    it("should categorize repository correctly", () => {
      const repo = { language: "JavaScript", name: "js-project" };
      const languages = { JavaScript: 100 };

      const result = githubService.categorizeRepository(repo, languages);

      expect(typeof result).toBe("string");
    });

    it("should handle repository without language", () => {
      const repo = { language: null, name: "no-language-project" };
      const languages = {};

      const result = githubService.categorizeRepository(repo, languages);

      expect(typeof result).toBe("string");
    });
  });

  describe("formatRepositoryForPortfolio", () => {
    it("should format repository correctly", () => {
      const repo = {
        id: 1,
        name: "test-repo",
        description: "Test repository",
        html_url: "https://github.com/user/test-repo",
        language: "JavaScript",
        stargazers_count: 10,
        forks_count: 5,
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-12-01T00:00:00Z",
      };
      const languages = { JavaScript: 100 };

      const result = githubService.formatRepositoryForPortfolio(
        repo,
        languages
      );

      expect(result).toHaveProperty("_id", "github-1");
      expect(result).toHaveProperty("title");
      expect(result).toHaveProperty("description", "Test repository");
      expect(result).toHaveProperty("technologies");
      expect(result).toHaveProperty(
        "githubUrl",
        "https://github.com/user/test-repo"
      );
    });
  });
});
