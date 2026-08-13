const axios = require('axios');
const Profile = require('../models/Profile');

// Cache storage
let cachedMediumPosts = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const DEFAULT_MEDIUM_POSTS = [
  {
    id: 'post-1',
    title: 'Building Scalable Full-Stack Applications with MERN & AWS',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2024-06-15',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural guide on designing decoupled microservices, optimizing MongoDB indexes, and deploying React apps with AWS ECS & CloudFront.',
    categories: ['MERN', 'Architecture', 'AWS', 'Node.js'],
    readTime: '5 min read'
  },
  {
    id: 'post-2',
    title: 'Mastering Advanced React Patterns & Custom Hooks',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2024-04-20',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    description: 'Deep dive into state management strategies, RTK Query caching, Framer Motion animations, and performance optimizations in enterprise React applications.',
    categories: ['React', 'JavaScript', 'Frontend', 'Performance'],
    readTime: '6 min read'
  },
  {
    id: 'post-3',
    title: 'Containerization Best Practices with Docker & CI/CD Pipelines',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2024-02-10',
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80',
    description: 'How to write multi-stage Dockerfiles, streamline GitHub Actions workflows, and automate production deployments with zero downtime.',
    categories: ['Docker', 'DevOps', 'CI/CD', 'Cloud'],
    readTime: '4 min read'
  }
];

/**
 * Extracts Medium username from DB or fallback string
 */
const getMediumUsername = async () => {
  try {
    const profile = await Profile.findOne({ isActive: true }).lean();
    const mediumUrl = profile?.medium || profile?.socialLinks?.medium || profile?.mediumUrl;
    if (mediumUrl) {
      const match = mediumUrl.match(/@([^/]+)/);
      if (match && match[1]) return match[1];
    }
  } catch (_e) {
    // DB fallback
  }
  return 'bkshaw1994';
};

/**
 * Strips HTML tags and returns a short snippet
 */
const cleanTextSnippet = (html, maxLength = 160) => {
  if (!html) return '';
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Checks if an image URL is a real image and not a tracking pixel
 */
const isValidImage = (url) => {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('stat?event=') || url.includes('referrerSource=')) return false;
  return true;
};

/**
 * Extracts first valid image URL from HTML string
 */
const extractThumbnail = (html) => {
  if (!html) return null;
  const matches = html.match(/<img[^>]+src=["']([^"']+)["']/gi);
  if (!matches) return null;
  for (const imgTag of matches) {
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1] && isValidImage(srcMatch[1])) {
      return srcMatch[1];
    }
  }
  return null;
};

/**
 * Calculates estimated read time from text
 */
const calculateReadTime = (text) => {
  if (!text) return '3 min read';
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
};

/**
 * Fetches Medium posts from RSS-to-JSON API or fallback
 */
const fetchMediumPosts = async () => {
  const now = Date.now();
  if (cachedMediumPosts && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedMediumPosts;
  }

  const username = await getMediumUsername();

  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    const response = await axios.get(apiUrl, { timeout: 8000 });
    const data = response.data;

    if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
      const formattedPosts = data.items.map((item, idx) => {
        let thumbnail = isValidImage(item.thumbnail) ? item.thumbnail : null;
        if (!thumbnail) {
          thumbnail = extractThumbnail(item.content || item.description);
        }
        if (!thumbnail) {
          thumbnail = DEFAULT_MEDIUM_POSTS[idx % DEFAULT_MEDIUM_POSTS.length].thumbnail;
        }

        const snippet = cleanTextSnippet(item.description || item.content);
        const categories = Array.isArray(item.categories) && item.categories.length > 0
          ? item.categories.slice(0, 4)
          : ['Web Development', 'MERN'];

        return {
          id: item.guid ? encodeURIComponent(item.guid.split('/').pop() || item.guid) : `medium-post-${idx}`,
          title: item.title || 'Medium Article',
          link: item.link || `https://medium.com/@${username}`,
          pubDate: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : 'Recent',
          thumbnail,
          description: snippet,
          categories,
          readTime: calculateReadTime(item.content || item.description),
          content: item.content || item.description || snippet
        };
      });

      cachedMediumPosts = formattedPosts;
      cacheTimestamp = now;
      return formattedPosts;
    }
  } catch (err) {
    console.warn('Medium RSS API call failed or timed out, returning fallback posts:', err.message);
  }

  // Fallback
  cachedMediumPosts = DEFAULT_MEDIUM_POSTS;
  cacheTimestamp = now;
  return DEFAULT_MEDIUM_POSTS;
};

module.exports = {
  fetchMediumPosts,
  getMediumUsername
};
