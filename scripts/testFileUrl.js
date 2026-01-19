// Test the getFileUrl function
const getServerUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
  return apiUrl.replace("/api", "");
};

const getFileUrl = (filePath) => {
  if (!filePath) return "";

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  const serverUrl = getServerUrl();
  return `${serverUrl}${filePath}`;
};

// Test cases
console.log("Test 1:", getFileUrl("/api/profile/image"));
console.log("Expected: http://localhost:5000/api/profile/image");

console.log("\nTest 2:", getFileUrl("/api/profile/resume"));
console.log("Expected: http://localhost:5000/api/profile/resume");
