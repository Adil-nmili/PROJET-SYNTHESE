import { axiosClient } from "../api/axios"

const Order = {
    getCSRFToken: async () => {
        return await axiosClient.get("/sanctum/csrf-cookie")
    },
    getAll: async () => {
        return axiosClient.get('/api/orders')
    },
    create: async (payload) => {
        return axiosClient.post('/api/orders', payload)
    },
    update: async (id, payload) => {
        return axiosClient.put(`/api/orders/${id}`, payload)
    },
    delete: async (id) => {
        return axiosClient.delete(`/api/orders/${id}`)
    },
    getById: async (id) => {
        return axiosClient.get(`/api/orders/${id}`)
    },
    getUserOrders: async (userId) => {
        return axiosClient.get(`/api/users/${userId}/orders`)
    }
}

export default Order 