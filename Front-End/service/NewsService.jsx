import { axiosClient } from "../api/axios"

export const NewsService = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },

    createArticle : async (payload) => {
        return axiosClient.post('/api/news', payload)
    },
    getAllArticles :  async () => {
        return axiosClient.get('/api/news')
    },
    updateArticle : async (id, payload) => {
        return axiosClient.put(`/api/news/${id}`,payload)
    },
    getArticleById : async (id) => {
        return axiosClient.get(`/api/news/${id}`)
    },
    deleteArticle : async (id) => {
        return axiosClient.delete(`/api/news/${id}`)
    }
}