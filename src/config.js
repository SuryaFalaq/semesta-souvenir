const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getApiUrl = (path) => `${API_URL}${path}`;
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/img/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads')) return `${API_URL}${imagePath}`;
  return imagePath;
};

export default API_URL;
