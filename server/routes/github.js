const express = require('express');
const router = express.Router();
const githubService = require('../services/githubService');

// Get all repositories
router.get('/repos', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const repos = await githubService.getUserRepositories(page, limit);

    // Get languages for each repository
    const reposWithDetails = await Promise.all(
      repos.map(async (repo) => {
        try {
          const languages = await githubService.getRepositoryLanguages(repo.name);
          return githubService.formatRepositoryForPortfolio(repo, languages);
        } catch (error) {
          console.error(`Error processing repo ${repo.name}:`, error.message);
          return githubService.formatRepositoryForPortfolio(repo, {});
        }
      })
    );

    const publicRepos = reposWithDetails.filter(repo => !repo.isPrivate);

    res.json({
      success: true,
      data: publicRepos,
      total: publicRepos.length
    });
  } catch (error) {
    console.error('Error in /repos route:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GitHub repositories',
      error: error.message
    });
  }
});

// Get featured repositories (with stars or forks)
router.get('/repos/featured', async (req, res) => {
  try {
    const repos = await githubService.getUserRepositories(1, 50);

    const featuredRepos = await Promise.all(
      repos
        .filter(repo => !repo.private && (repo.stargazers_count > 0 || repo.forks_count > 0 || repo.name.toLowerCase().includes('portfolio')))
        .slice(0, 6) // Top 6 featured
        .map(async (repo) => {
          try {
            const languages = await githubService.getRepositoryLanguages(repo.name);
            return githubService.formatRepositoryForPortfolio(repo, languages);
          } catch (error) {
            console.error(`Error processing featured repo ${repo.name}:`, error.message);
            return githubService.formatRepositoryForPortfolio(repo, {});
          }
        })
    );

    res.json({
      success: true,
      data: featuredRepos
    });
  } catch (error) {
    console.error('Error in /repos/featured route:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured repositories',
      error: error.message
    });
  }
});

// Get specific repository details
router.get('/repos/:repoName', async (req, res) => {
  try {
    const { repoName } = req.params;
    const repo = await githubService.getRepository(repoName);
    const languages = await githubService.getRepositoryLanguages(repoName);
    const readme = await githubService.getRepositoryReadme(repoName);

    const formattedRepo = githubService.formatRepositoryForPortfolio(repo, languages);
    formattedRepo.readme = readme;

    res.json({
      success: true,
      data: formattedRepo
    });
  } catch (error) {
    console.error('Error in /repos/:repoName route:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching repository details',
      error: error.message
    });
  }
});

// Get repository statistics
router.get('/stats', async (req, res) => {
  try {
    const repos = await githubService.getUserRepositories(1, 100);
    const publicRepos = repos.filter(repo => !repo.private);

    const stats = {
      totalRepos: publicRepos.length,
      totalStars: publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: publicRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: {},
      mostStarred: publicRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)[0],
      mostRecent: publicRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]
    };

    // Count languages
    publicRepos.forEach(repo => {
      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }
    });

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in /stats route:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GitHub statistics',
      error: error.message
    });
  }
});

module.exports = router;