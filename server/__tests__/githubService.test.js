// Example test for GitHub service
const githubService = require('../services/githubService');

// Mock axios for testing
jest.mock('axios');
const axios = require('axios');

describe('GitHub Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserRepositories', () => {
    it('should fetch repositories successfully', async () => {
      // Mock API response
      const mockRepos = [
        {
          id: 1,
          name: 'test-repo',
          description: 'Test repository',
          html_url: 'https://github.com/user/test-repo',
          language: 'JavaScript',
          stargazers_count: 10,
          forks_count: 5,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-12-01T00:00:00Z'
        }
      ];

      axios.get.mockResolvedValue({ data: mockRepos });

      const result = await githubService.getUserRepositories();

      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/bkshaw1994/repos',
        expect.objectContaining({
          params: expect.objectContaining({
            page: 1,
            per_page: 30,
            sort: 'updated',
            direction: 'desc'
          })
        })
      );
      expect(result).toEqual(mockRepos);
    });

    it('should handle API errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('API Error'));

      await expect(githubService.getUserRepositories()).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('categorizeRepository', () => {
    it('should categorize repository correctly for various languages', () => {
      expect(githubService.categorizeRepository({ name: 'react-app' }, { JavaScript: 100 })).toBe('frontend');
      expect(githubService.categorizeRepository({ name: 'express-api' }, { JavaScript: 100 })).toBe('backend');
      expect(githubService.categorizeRepository({ name: 'web-site' }, { JavaScript: 100 })).toBe('web');
      expect(githubService.categorizeRepository({ name: 'py-app' }, { Python: 100 })).toBe('backend');
      expect(githubService.categorizeRepository({ name: 'java-app' }, { Java: 100 })).toBe('backend');
      expect(githubService.categorizeRepository({ name: 'html-app' }, { HTML: 100 })).toBe('frontend');
      expect(githubService.categorizeRepository({ name: 'cpp-app' }, { 'C++': 100 })).toBe('system');
      expect(githubService.categorizeRepository({ name: 'misc-app' }, { Ruby: 100 })).toBe('other');
    });
  });

  describe('getRepository & languages & readme', () => {
    it('should fetch single repository', async () => {
      const mockRepo = { name: 'my-repo' };
      axios.get.mockResolvedValue({ data: mockRepo });
      const result = await githubService.getRepository('my-repo');
      expect(result).toEqual(mockRepo);
    });

    it('should handle getRepository error', async () => {
      axios.get.mockRejectedValue(new Error('Not found'));
      await expect(githubService.getRepository('bad-repo')).rejects.toThrow('Not found');
    });

    it('should fetch languages or fallback to empty object', async () => {
      axios.get.mockResolvedValueOnce({ data: { JavaScript: 100 } });
      const langs = await githubService.getRepositoryLanguages('my-repo');
      expect(langs).toEqual({ JavaScript: 100 });

      axios.get.mockRejectedValueOnce(new Error('Error'));
      const emptyLangs = await githubService.getRepositoryLanguages('bad-repo');
      expect(emptyLangs).toEqual({});
    });

    it('should fetch readme or fallback to null', async () => {
      axios.get.mockResolvedValueOnce({ data: '# README' });
      const readme = await githubService.getRepositoryReadme('my-repo');
      expect(readme).toEqual('# README');

      axios.get.mockRejectedValueOnce(new Error('Error'));
      const nullReadme = await githubService.getRepositoryReadme('bad-repo');
      expect(nullReadme).toBeNull();
    });
  });

  describe('formatRepositoryForPortfolio', () => {
    it('should format repository correctly', () => {
      const repo = {
        id: 1,
        name: 'test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/user/test-repo',
        language: 'JavaScript',
        stargazers_count: 10,
        forks_count: 5,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-12-01T00:00:00Z'
      };
      const languages = { JavaScript: 100 };

      const result = githubService.formatRepositoryForPortfolio(
        repo,
        languages
      );

      expect(result).toHaveProperty('_id', 'github-1');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('description', 'Test repository');
      expect(result).toHaveProperty('technologies');
      expect(result).toHaveProperty(
        'githubUrl',
        'https://github.com/user/test-repo'
      );
    });
  });
});

