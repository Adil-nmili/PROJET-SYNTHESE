import { axiosClient } from "../api/axios"

const SubCategory = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    create: async (payload) => {
        return axiosClient.post('/api/sub-categories', payload, { headers: { "Content-Type": "multipart/form-data" } })
    },
    update: async (id, payload) => {
        return axiosClient.put(`/api/sub-categories/${id}`, payload, { headers: { "Content-Type": "multipart/form-data" }, method: 'PUT'})
    },
    delete: async (id) => {
        return axiosClient.delete(`/api/sub-categories/${id}`)
    },
    getAll: async () => {
        return axiosClient.get('/api/sub-categories')
    },
    getById: async (id) => {
        return axiosClient.get(`/api/sub-categories/${id}`)
    },
    getByCategory: async (categoryId) => {
        return axiosClient.get(`/api/sub-categories/category/${categoryId}`)
    }
}

export default SubCategory 