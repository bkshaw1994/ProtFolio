const axios = require('axios');

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.username = process.env.GITHUB_USERNAME || 'bkshaw1994';
    this.cache = new Map();
    this.cacheTTL = 10 * 60 * 1000; // 10 minutes cache TTL
  }

  getHeaders() {
    const headers = {
      'User-Agent': 'Portfolio-App'
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
  }

  async getUserRepositories(page = 1, perPage = 30) {
    const cacheKey = `repos_${page}_${perPage}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const response = await axios.get(`${this.baseURL}/users/${this.username}/repos`, {
        headers: this.getHeaders(),
        params: {
          page,
          per_page: perPage,
          sort: 'updated',
          direction: 'desc'
        }
      });

      this.cache.set(cacheKey, {
        timestamp: Date.now(),
        data: response.data
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error.message);
      // Return cached data if available on error
      if (cached) return cached.data;
      throw error;
    }
  }

  async getRepository(repoName) {
    const cacheKey = `repo_${repoName}`;
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}`, {
        headers: this.getHeaders()
      });
      this.cache.set(cacheKey, { timestamp: Date.now(), data: response.data });
      return response.data;
    } catch (error) {
      console.error(`Error fetching repository ${repoName}:`, error.message);
      if (cached) return cached.data;
      throw error;
    }
  }

  async getRepositoryLanguages(repoName) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}/languages`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching languages for ${repoName}:`, error.message);
      return {};
    }
  }

  async getRepositoryReadme(repoName) {
    try {
      const response = await axios.get(`${this.baseURL}/repos/${this.username}/${repoName}/readme`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching README for ${repoName}:`, error.message);
      return null;
    }
  }

  formatRepositoryForPortfolio(repo, languages = {}) {
    return {
      _id: `github-${repo.id}`,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'No description available',
      technologies: Object.keys(languages).slice(0, 5), // Top 5 languages
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || null,
      category: this.categorizeRepository(repo, languages),
      featured: repo.stargazers_count > 0 || repo.forks_count > 0,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      isPrivate: repo.private,
      isGitHub: true, // Flag to identify GitHub repos
      image: this.getRepositoryImage(repo) // Default GitHub image
    };
  }

  categorizeRepository(repo, languages) {
    const repoLanguages = Object.keys(languages).map(lang => lang.toLowerCase());
    const repoName = repo.name.toLowerCase();

    if (repoLanguages.includes('javascript') || repoLanguages.includes('typescript')) {
      if (repoLanguages.includes('react') || repoName.includes('react') || repoName.includes('portfolio')) {
        return 'frontend';
      }
      if (repoLanguages.includes('node') || repoName.includes('node') || repoName.includes('express')) {
        return 'backend';
      }
      return 'web';
    }

    if (repoLanguages.includes('python')) return 'backend';
    if (repoLanguages.includes('java')) return 'backend';
    if (repoLanguages.includes('html') || repoLanguages.includes('css')) return 'frontend';
    if (repoLanguages.includes('c++') || repoLanguages.includes('c')) return 'system';

    return 'other';
  }

  getRepositoryImage(repo) {
    const language = repo.language?.toLowerCase();
    const languageColors = {
      javascript: '#f7df1e',
      typescript: '#3178c6',
      python: '#3776ab',
      java: '#ed8b00',
      html: '#e34f26',
      css: '#1572b6',
      react: '#61dafb',
      'c++': '#00599c',
      c: '#a8b9cc'
    };

    return `https://via.placeholder.com/400x200/${languageColors[language]?.slice(1) || '333'}/white?text=${repo.name}`;
  }
}

module.exports = new GitHubService();