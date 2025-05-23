import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class NewsService {
  // Create a new news article
  static async createNews(formData) {
    try {
      const response = await axios.post(`${API_URL}/news`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get all news articles
  static async getAllNews() {
    try {
      const response = await axios.get(`${API_URL}/news`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get a single news article by ID
  static async getNewsById(id) {
    try {
      const response = await axios.get(`${API_URL}/news/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Update a news article
  static async updateNews(id, formData) {
    try {
      const response = await axios.put(`${API_URL}/news/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Delete a news article
  static async deleteNews(id) {
    try {
      const response = await axios.delete(`${API_URL}/news/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Add a comment to a news article
  static async addComment(newsId, comment) {
    try {
      const response = await axios.post(`${API_URL}/news/${newsId}/comments`, { comment });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  // Get comments for a news article
  static async getComments(newsId) {
    try {
      const response = await axios.get(`${API_URL}/news/${newsId}/comments`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}

export default NewsService; 