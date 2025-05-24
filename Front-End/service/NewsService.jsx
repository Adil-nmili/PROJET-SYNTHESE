import { axiosClient } from "../api/axios"

export const NewsService = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie") 
    },

    createArticle : async (formData) => {
        return axiosClient.post('/api/news-articles', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
    },
    getAllArticles :  async () => {
        return axiosClient.get('/api/news-articles')
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

