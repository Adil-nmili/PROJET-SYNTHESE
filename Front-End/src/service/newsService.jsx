import axiosClient from './axiosClient';

export const NewsService = {
    getAllArticles: async () => {
        return await axiosClient.get('/news');
    },

    getArticleById: async (id) => {
        return await axiosClient.get(`/news/${id}`);
    },

    createArticle: async (formData) => {
        return await axiosClient.post('/news', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
    },

    updateArticle: async (id, formData) => {
        return await axiosClient.put(`/news/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
    },

    deleteArticle: async (id) => {
        return await axiosClient.delete(`/news/${id}`);
    }
}; 