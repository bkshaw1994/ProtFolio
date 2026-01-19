/**
 * Get the base URL for the API server (without /api suffix)
 */
export const getServerUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  return apiUrl.replace('/api', '');
};

/**
 * Get the full URL for a file stored on the server
 * @param {string} filePath - The file path from the database (e.g., /api/profile/image)
 * @returns {string} - The full URL to access the file
 */
export const getFileUrl = (filePath) => {
  if (!filePath) return '';

  // If filePath already includes http/https, return as is
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }

  // Construct the full URL
  const serverUrl = getServerUrl();
  const fullUrl = `${serverUrl}${filePath}`;

  return fullUrl;
};
